﻿using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Security
{
    [RoutePrefix("api/permission")]
    [GrouperAuthorize(PermissionSpec.Permission)]
    public class PermissionController : BaseSecurityController
    {
        private IPermissionService _permissionService;

        public PermissionController()
        {
            _permissionService = new PermissionService(PermissionRepository, Uow);
        }

        // GET: api/Permission
        public IHttpActionResult Get()
        {
            var list = _permissionService.GetAll();
            return Ok(list);
        }

        // GET: api/Permission/group-id
        public IHttpActionResult Get(int id)
        {
            return Ok(_permissionService.GetById(id));
        }

        // GET: api/Permission/byuser/username
        [Route("byuser/{username}")]
        public IHttpActionResult GetByUser(string username)
        {
            return Ok(_permissionService.GetByUser(username));
        }

        [Route("bygroup/{groupId:int}")]
        // GET: api/Permission/bygroup/groupId
        public IHttpActionResult GetByGroup(int groupId)
        {
            return Ok(_permissionService.GetByGroup(groupId));
        }

        public IHttpActionResult Post([FromBody]string[] ids)
        {
            _permissionService.Add(ids);

            return Ok(ids);
        }

        // DELETE: api/Permission/
        public IHttpActionResult Delete([FromBody]string[] ids)
        {
            if (ids == null)
                return BadRequest();
           _permissionService.Delete(ids);
            return Ok();
        }

       
    }
}