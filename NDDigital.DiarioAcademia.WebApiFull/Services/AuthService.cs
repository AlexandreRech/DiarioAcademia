using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using NDDigital.DiarioAcademia.WebApiFull.Models.CommandModels.Accounts;
using NDDigital.DiarioAcademia.WebApiFull.Repositories;

namespace NDDigital.DiarioAcademia.WebApiFull.Services
{
    public interface IAuthService
    {
        IdentityResult RegisterUser(RegisterNewAccountCommand acccountCommand);

        IdentityUser FindUser(string userName, string password);

        void Dispose();
    }

    public class AuthServiceStub : IAuthService, IDisposable
    {
        private AccountRepository _userManager;

        public AuthServiceStub()
        {
            _userManager = new AccountRepository();
        }

        public IdentityResult RegisterUser(RegisterNewAccountCommand acccountCommand)
        {
            var user = new IdentityUser
            {
                UserName = acccountCommand.UserName
            };

            var result = _userManager.Create(user, acccountCommand.Password);

            return result;
        }

        public IdentityUser FindUser(string userName, string password)
        {
            IdentityUser user = _userManager.Find(userName, password);

            return user;
        }

        public void Dispose()
        {
            _userManager.Dispose();

        }
    }
}