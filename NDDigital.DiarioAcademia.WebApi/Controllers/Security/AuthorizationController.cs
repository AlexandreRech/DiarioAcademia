using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.WebApi.Controllers.Base;
using NDDigital.DiarioAcademia.WebApi.Filters;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApi.Controllers.Authentication
{
    [RoutePrefix("api/authentication")]
    [GrouperAuthorize(Claim.Manager)]
    public class AuthorizationController : BaseSecurityController
    {
        private IClaimService _authservice;

        public AuthorizationController()
        {
            _authservice = new ClaimService(GroupRepository, PermissionRepository, AccountRepository, AuthorizationRepository, Uow);
        }

        [Route("addpermission/{groupId:int}")]
        public IHttpActionResult AddPermissionsToGroup(int groupId, [FromBody]ClaimDTO[] permissions)
        {
            _authservice.AddAuthorizationToGroup(groupId, permissions);
            return Ok();
        }

        [Route("removepermission/{groupId:int}")]
        public IHttpActionResult RemovePermissionsToGroup(int groupId, [FromBody]ClaimDTO[] permissions)
        {
            _authservice.RemoveAuthorizationFromGroup(groupId, permissions);
            return Ok();
        }

        [Route("addgroup/{username}")]
        public IHttpActionResult AddGroupToUser(string username, [FromBody]int[] groups)
        {
            _authservice.AddGroupToUser(username, groups);
            return Ok();
        }

        [Route("removegroup/{username}")]
        public IHttpActionResult removeGroupToUser(string username, [FromBody]int[] groups)
        {
            _authservice.RemoveGroupFromUser(username, groups);
            return Ok();
        }

        [Route("isAuthorized/{username}")]
        public IHttpActionResult isAuthorized(string username, [FromBody]string[] permissions)
        {
            return Ok(_authservice.IsAuthorized(username, permissions));
        }
    }
}