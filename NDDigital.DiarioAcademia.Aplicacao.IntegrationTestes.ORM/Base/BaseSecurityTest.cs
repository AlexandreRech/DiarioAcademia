using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class BaseSecurityTest : BaseAuthTest
    {
        protected IPermissionRepository PermissionRepository;
        protected IGroupRepository GroupRepository;
        protected IAccountRepository AccountRepository;
        protected IUserRepository UserRepository;

        [TestInitialize]
        public override void Initialize()
        {
            base.Initialize();

            var context = Factory.Get();

            Uow = new AuthUnitOfWork(Factory);

            PermissionRepository = new PermissionRepository(Factory);
            GroupRepository = new GroupRepository(Factory);
            AccountRepository = new AccountRepository(Factory);
            UserRepository = new UserRepository(IdentityUserStore, Factory);

            AuthorizationService = new AuthorizationService(GroupRepository, PermissionRepository, AccountRepository, Uow);
        }
    }
}