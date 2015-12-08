using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Base
{
    public class BaseSecurityController : BaseApiController
    {
        protected IPermissionRepository PermissionRepository;
        protected IGroupRepository GroupRepository;
        protected IAccountRepository AccountRepository;
        protected IClaimRepository ClaimRepository;



        public BaseSecurityController()
        {
            PermissionRepository = Injection.Get<IPermissionRepository>();
            GroupRepository = Injection.Get<IGroupRepository>();
            AccountRepository = Injection.Get<IAccountRepository>();
            ClaimRepository = Injection.Get<IClaimRepository>();

            Uow = Injection.Get<IAuthUnitOfWork>();
        }
    }
}