﻿using Infrasctructure.DAO.ORM.Contexts;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities.Security;
using NDDigital.DiarioAcademia.Infraestrutura.CepServices;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System;
using System.Linq.Expressions;

namespace NDDigital.DiarioAcademia.Infraestrutura.Orm.Security
{


    public class UserRepository : UserManager<User>
    {
        private static EntityFrameworkContext _appDbContext;
        public IUserStore<User> _store { get; set; }

        public UserRepository(IUserStore<User> store)
            : base(store)
        {
            _appDbContext = _appDbContext ?? new EntityFrameworkContext();
        }

        public static UserRepository Create(IdentityFactoryOptions<UserRepository> options, IOwinContext context)
        {
            _appDbContext = context.Get<EntityFrameworkContext>();
            var userManager = new UserRepository(new UserStore<User>(_appDbContext));

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

        public IList<User> GetUsersByGroup(Group group)
        {
            var gr = group; //key "group" is reserved
            return (
                from c
                in _appDbContext.Users
                where c.Account.Groups.Any(g => g.Id == gr.Id)
                select c
                ).ToList();
        }

        public IList<User> GetUsers()
        {
            return (from c
                    in _appDbContext.Users
                    select c
                    ).ToList();
        }

        public User GetUserById(string id)
        {
            return (from c
                    in _appDbContext.Users.Include(u => u.Account)
                    where c.Id == id
                    select c).FirstOrDefault();
        }

        public User GetUserByUsername(string username)
        {
            return (from c
                    in (_appDbContext.Users).Include(x => x.Account).Include(x=>x.Account.Groups)
                    where c.UserName == username
                    select c
                    ).FirstOrDefault();
        }

        public User GetByUserName(string username)
        {
            return (from c
                     in _appDbContext.Users
                    where c.UserName == username
                    select c).FirstOrDefault();
        }

        public void Delete(string username)
        {
            var user = GetByUserName(username);
            _appDbContext.Users.Remove(user);
        }

        public IList<Group> GetGroupsByUser(string username)
        {
            var user = GetUserByUsername(username);

            return user?.Account?.Groups ?? new List<Group>();
        }

     
    }

}