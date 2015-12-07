using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;

namespace NDDigital.DiarioAcademia.WebApi.Controllers.Base
{
    public class BaseSecurityController : BaseApiController
    {
        protected IPermissionRepository PermissionRepository;
        protected IGroupRepository GroupRepository;
        protected IAccountRepository AccountRepository;
        protected IAuthorizationRepository AuthorizationRepository;


        public BaseSecurityController()
        {
            PermissionRepository = Injection.Get<IPermissionRepository>();
            GroupRepository = Injection.Get<IGroupRepository>();
            AccountRepository = Injection.Get<IAccountRepository>();
            AuthorizationRepository = Injection.Get<IAuthorizationRepository>();

            Uow = Injection.Get<IAuthUnitOfWork>();
        }
    }
}