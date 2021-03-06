﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using NDDigital.DiarioAcademia.Infraestrutura.CepServices;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contexts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories
{
    public class UserRepository : UserManager<User>, IUserRepository
    {
        private static AuthContext dataContext;
        private static AuthFactory _databaseFactory;
        public UserStore<User> _store { get; set; }

        public UserRepository(UserStore<User> store, AuthFactory databaseFactory)
            : base(store)
        {
            _databaseFactory = _databaseFactory ?? databaseFactory ?? new AuthFactory();
            if (_databaseFactory != null)
                dataContext = dataContext ?? (_databaseFactory.Get() as AuthContext);
        }

        public static UserRepository Create(IdentityFactoryOptions<UserRepository> options, IOwinContext context)
        {
            dataContext = context.Get<AuthContext>();
            var userManager = new UserRepository(new UserStore<User>(), _databaseFactory);

            // Configure validation logic for usernames
            userManager.UserValidator = new UserValidator<User>(userManager)
            {
                AllowOnlyAlphanumericUserNames = true
            };

            // Configure validation logic for passwords
            userManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };

            userManager.EmailService = new EmailService();

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                userManager.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            return userManager;
        }

        public void AddUser(User user)
        {
            User dbuser = null;
            try
            {
                dbuser = dataContext.Users.Where(u => u.UserName == user.UserName).FirstOrDefault();
                if (dbuser != null)
                    throw new ApplicationException("UsernameJaExisteException");
                user.Account = new Account(user.UserName);
                dataContext.Users.Add(user);
                dataContext.SaveChanges();
            }
            catch (InvalidOperationException exe)
            {
                dataContext = new AuthContext();
                AddUser(user);
            }
        }

        public IList<User> GetUsersByGroup(Group group)
        {
           
            try
            {
                var gr = group; //key "group" is reserved
                return (
                    from c
                    in dataContext.Users
                    where c.Account.Groups.Any(g => g.Id == gr.Id)
                    select c
                    ).ToList();
            }
            catch (InvalidOperationException exe)
            {
                dataContext = new AuthContext();
                return GetUsersByGroup(group);
            }
        }

        public IList<User> GetUsers()
        {
            try
            {
                return (from c
                    in dataContext.Users
                    select c
                     ).ToList();
            }
            catch (InvalidOperationException exe)
            {
                dataContext = new AuthContext();
                return GetUsers();
            }
        }

        public User GetUserById(string id)
        {
            try
            {
                return (from c
                      in dataContext.Users.Include(u => u.Account)
                        where c.Id == id
                        select c).FirstOrDefault();
            }
            catch (InvalidOperationException exe)
            {
                dataContext = new AuthContext();
                return GetUserById(id);
            }
           
        }

        public User GetUserByUsername(string username)
        {

            // TODO: rever implementação
            try
            {
                var user = (from c
                                      in (dataContext.Users)//.Include(x => x.Account)//.Include(x => x.Account.Groups)
                            where c.UserName == username
                            select c
                                       ).FirstOrDefault();

                if (user != null) 
                user.Account = dataContext.Accounts.Include(a => a.Groups).Where(a => a.Username == username).FirstOrDefault();

                return user;
            }
            catch (InvalidOperationException exe)
            {
                dataContext = new AuthContext();
                return GetUserByUsername(username);
            }
        }

        public void Delete(string id)
        {
            var user = GetUserById(id);
            if (user == null) return;

            var acc = dataContext.Accounts.Where(a => a.Username == user.UserName).FirstOrDefault();
            dataContext.Users.Remove(user);

            dataContext.Accounts.Remove(acc);
            try
            {
                dataContext.SaveChanges();

            }
            catch (DbUpdateException)
            {
                dataContext = new AuthContext();
                Delete(id);
            }


        }

        public IList<Group> GetGroupsByUser(string username)
        {
            var user = GetUserByUsername(username);

            if (user != null && user.Account != null)

                return user.Account.Groups;

            return new List<Group>();

            // return user?.Account?.Groups ?? new List<Group>();  todo: c# 6
        }

        public void Update(User user)
        {
          
            dataContext.SaveChanges();
        }

        public void UpdateWithUsername(User user, string newUsername)
        {
            Account acc;
            if (user.Account == null)
                acc = dataContext.Accounts.Where(a => a.Username == user.UserName).First();
            else
                acc = user.Account;
            acc.Username = user.UserName=newUsername;
            Update(user);
        }
    }
}