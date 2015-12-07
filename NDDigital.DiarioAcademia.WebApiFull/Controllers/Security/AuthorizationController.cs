using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Security
{
    [RoutePrefix("api/authorization")]
    [GrouperAuthorize(PermissionSpec.Manager)]
    public class AuthorizationController : BaseSecurityController
    {
        private IClaimService _authservice;

        public AuthorizationController()
        {
            _authservice = new ClaimService(GroupRepository, PermissionRepository, AccountRepository, AuthorizationRepository, Uow);
        }

        // GET: api/authorization
        public IHttpActionResult Get()
        {
            var list = _authservice.GetAll();
            return Ok(list);
        }

        // GET: api/authorization/1
        public IHttpActionResult Get(int id)
        {
            var group = _authservice.GetById(id);

            return Ok(group);
        }

        // POST: api/authorization
        public IHttpActionResult Post([FromBody]ClaimDTO[] value)
        {
            foreach (var item in value)
            {
                _authservice.Add(item);
                
            }
            return Ok();
        }

        // DELETE: api/authorization/5
        public IHttpActionResult Delete(int id)
        {
            _authservice.Delete(id);
            return Ok();
        }


        [Route("deletemany")]
        public IHttpActionResult Delete([FromBody]ClaimDTO[] authorizations)
        {
            foreach (ClaimDTO item in authorizations)
            {
                _authservice.Delete(item.Id);
            }
            return Ok();
        }

        [GrouperAuthorize(PermissionSpec.Authorize_Permissions_Group)]
        [Route("addauthorize/{groupId:int}")]
        public IHttpActionResult AddAuthorizationToGroup(int groupId, [FromBody]ClaimDTO[] claims)
        {
            _authservice.AddAuthorizationToGroup(groupId, claims);
            return Ok();
        }

        [GrouperAuthorize(PermissionSpec.Authorize_Permissions_Group)]
        [Route("removeauthorize/{groupId:int}")]
        public IHttpActionResult RemovePermissionsToGroup(int groupId, [FromBody]ClaimDTO[] claims)
        {
            _authservice.RemoveAuthorizationFromGroup(groupId, claims);
            return Ok();
        }

        [GrouperAuthorize(PermissionSpec.Authorize_Groups_User)]
        [Route("addgroup/{username}")]
        public IHttpActionResult AddGroupToUser(string username, [FromBody]int[] groups)
        {
            _authservice.AddGroupToUser(username, groups);
            return Ok();
        }

        [GrouperAuthorize(PermissionSpec.Authorize_Groups_User)]
        [Route("removegroup/{username}")]
        public IHttpActionResult removeGroupToUser(string username, [FromBody]int[] groups)
        {
            _authservice.RemoveGroupFromUser(username, groups);
            return Ok();
        }
    }
}