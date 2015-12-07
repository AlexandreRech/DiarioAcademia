using Infrastructure.DAO.ORM.Common;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Orm.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Orm.Repositories;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using Ninject.Modules;

namespace NDDigital.DiarioAcademia.Infraestrutura.Orm.Modules
{
    public class EntityFrameworkNinjectModule : NinjectModule
    {
        public override void Load()
        {
            var entityFrameworkFactory = new EntityFrameworkFactory();
            var type = entityFrameworkFactory.GetType();

            Bind<IUnitOfWork>().To<EntityFrameworkUnitOfWork>().WithConstructorArgument(type, entityFrameworkFactory);
            Bind<ITurmaRepository>().To<TurmaRepositoryEF>().WithConstructorArgument(type, entityFrameworkFactory);
            Bind<IAulaRepository>().To<AulaRepositoryEF>().WithConstructorArgument(type, entityFrameworkFactory);
            Bind<IAlunoRepository>().To<AlunoRepositoryEF>().WithConstructorArgument(type, entityFrameworkFactory);

            var authFactory = new AuthFactory();
            var typeAuth = authFactory.GetType();


            Bind<IAuthUnitOfWork>().To<AuthUnitOfWork>().WithConstructorArgument(typeAuth, authFactory);
            Bind<IUserStore<User>>().To<UserStore<User>>();//.WithConstructorArgument(typeAuth, authFactory);
            Bind<IAccountRepository>().To<AccountRepository>().WithConstructorArgument(typeAuth, authFactory);
            Bind<IGroupRepository>().To<GroupRepository>().WithConstructorArgument(typeAuth, authFactory);
            Bind<IPermissionRepository>().To<PermissionRepository>().WithConstructorArgument(typeAuth, authFactory);
            Bind<IAuthorizationRepository>().To<AuthorizationRepository>().WithConstructorArgument(typeAuth, authFactory);            

        }
    }
}