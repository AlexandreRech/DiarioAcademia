using Microsoft.AspNet.Identity.EntityFramework;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Configurations;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Contexts
{
    public class AuthContext : IdentityDbContext<User>
    {
        public AuthContext()
             : base("DiarioAcademiaContext", throwIfV1Schema: false)
        {
            Database.SetInitializer(new AuthenticationInitializer());
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
            
        }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Account> Accounts { get; set; }

        public static AuthContext Create()
        {
            var context = new AuthContext();
            context.Seed();
            return context;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new UserConfiguration());
            modelBuilder.Configurations.Add(new GroupConfiguration());
            modelBuilder.Configurations.Add(new PermissionConfiguration());
            modelBuilder.Configurations.Add(new AccountConfiguration());
        }

        private void TrySave()
        {
            try
            {
                SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
            }
        }

        private void Seed()
        {
            Group group;
            if (Groups.Count() == 0)
            {
                group = new Group { Name = "Administration", IsAdmin = true };
                Groups.Add(group);
                TrySave();
            }
            else
            {
                group = (from c in Groups where c.Name == "Administration" select c).FirstOrDefault(); 
            }

            if (Accounts.Count() == 0)
            {
                var user = new User
                {
                    UserName = "superadmin",
                    PasswordHash = Criptografia.Criptografar("174963"),
                    Account = new Account("superadmin"),
                    FirstName = "admin",
                    LastName = "admin"
                };
                user.Account.Groups = new List<Group>();
                user.Account.Groups.Add(group);
                Users.Add(user);
                TrySave();
            }
        }
    }
}