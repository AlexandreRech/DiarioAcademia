using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using NDDigital.Extensions;

namespace NDDigital.DiarioAcademia.WebApiFull.Filters
{
    public class GrouperAuthorizeAttribute : AuthorizeAttribute
    {
        private IClaimService _authservice;

        private List<string> Permissions { get; set; }
        public bool Basic { get; set; }

        public GrouperAuthorizeAttribute()
        {
            _authservice = new ClaimService(
                Injection.Get<IGroupRepository>(),
                Injection.Get<IPermissionRepository>(),
                Injection.Get<IAccountRepository>(),
                Injection.Get<IAuthorizationRepository>(),
                Injection.Get<IAuthUnitOfWork>()
                );
        }
        public GrouperAuthorizeAttribute(bool basic): this()
        {
            this.Basic = basic;
        }

        public GrouperAuthorizeAttribute(params string[] permissions) : this()
        {
            Permissions = new List<string>();

            foreach (var item in permissions)
            {
                var split = item.Split('.');
                Permissions.AddRange(split);
            }

            Permissions = Permissions.Distinct().ToList();
            Permissions.RemoveAll(x => x == "");
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
           // var xml = actionContext.Serialize();
            var result = base.IsAuthorized(actionContext);
            if (result)
            {
                if (Basic)
                    return true;
                ClaimsIdentity claimsIdentity;
                var httpContext = HttpContext.Current;
                if (!(httpContext.User.Identity is ClaimsIdentity))
                    return false;
                claimsIdentity = httpContext.User.Identity as ClaimsIdentity;
                var subIdClaims = claimsIdentity.FindFirst("user");
                if (subIdClaims == null) return false;
                var userSubId = subIdClaims.Value;
                result = _authservice.IsAuthorized(userSubId, Permissions.ToArray());
            }
            return result;
        }
    }
}