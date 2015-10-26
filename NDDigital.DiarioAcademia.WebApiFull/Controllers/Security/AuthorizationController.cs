using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Security
{
    [RoutePrefix("api/authentication")]
    [GrouperAuthorize(Claim.Manager)]
    public class AuthorizationController : BaseSecurityController
    {
        private IAuthorizationService _authservice;

        public AuthorizationController()
        {
            _authservice = new AuthorizationService(GroupRepository, PermissionRepository, AccountRepository, Uow);
        }

        [Route("addpermission/{groupId:int}")]
        public IHttpActionResult AddPermissionsToGroup(int groupId, [FromBody]string[] permissions)
        {
            _authservice.AddPermissionsToGroup(groupId, permissions);
            return Ok();
        }

        [Route("removepermission/{groupId:int}")]
        public IHttpActionResult RemovePermissionsToGroup(int groupId, [FromBody]string[] permissions)
        {
            _authservice.RemovePermissionsFromGroup(groupId, permissions);
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