﻿using Microsoft.AspNet.Identity;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories;
using Ninject.Modules;

namespace NDDigital.DiarioAcademia.Infraestrutura.SQL.Modules
{
    public class AdoNetNinjectModule : NinjectModule
    {
        public override void Load()
        {
            var factory = new AdoNetFactory();
            var type = factory.GetType();

            Bind<IUnitOfWork>().To<ADOUnitOfWork>().WithConstructorArgument(type, factory);
            Bind<ITurmaRepository>().To<TurmaRepositorySql>().WithConstructorArgument(type, factory);
            Bind<IAulaRepository>().To<AulaRepositorySql>().WithConstructorArgument(type, factory);
            Bind<IAlunoRepository>().To<AlunoRepositorySql>().WithConstructorArgument(type, factory);
            Bind<IPresencaRepository>().To<PresencaRepositorySql>().WithConstructorArgument(type, factory);

            var authFactory = new AuthFactory();
            Bind<IAuthUnitOfWork>().To<AuthUnitOfWork>().WithConstructorArgument("factory", authFactory);
            Bind<IUserStore<User>>().To<IdentityUserStore>().WithConstructorArgument("factory", authFactory);
            Bind<IAccountRepository>().To<AccountRepository>().WithConstructorArgument("factory", authFactory);
            Bind<IGroupRepository>().To<GroupRepository>().WithConstructorArgument("factory", authFactory);
            Bind<IPermissionRepository>().To<PermissionRepository>().WithConstructorArgument("factory", authFactory);
        }
    }
}