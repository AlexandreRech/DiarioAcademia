using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using Ninject.Modules;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Modules
{
    public class AuthNinjectModule : NinjectModule
    {
        public override void Load()
        {
            var factory = new AuthFactory();

            Bind<IAuthUnitOfWork>().To<AuthUnitOfWork>().WithConstructorArgument("factory", factory);
            Bind<IAccountRepository>().To<AccountRepository>().WithConstructorArgument("factory", factory);
            Bind<IGroupRepository>().To<GroupRepository>().WithConstructorArgument("factory", factory);
            Bind<IPermissionRepository>().To<PermissionRepository>().WithConstructorArgument("factory", factory);
            Bind<IAuthorizationRepository>().To<AuthorizationRepository>().WithConstructorArgument("factory", factory);            
            Bind<IUserStore<User>>().To<UserStore<User>>();
        }
    }
}