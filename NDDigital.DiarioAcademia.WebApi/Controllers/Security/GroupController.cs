﻿using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.WebApi.Controllers.Base;
using NDDigital.DiarioAcademia.WebApi.Filters;
using System;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApi.Controllers.Authentication
{
    [GrouperAuthorize(Claim.Manager_Group)]
    public class GroupController : BaseSecurityController
    {
        private IGroupService _groupService;

        public GroupController()
        {
            _groupService = new GroupService(GroupRepository, Uow);
        }

        // GET: api/Group
        [Authorize]
        public IHttpActionResult Get()
        {
            return Ok(_groupService.GetAll());
        }

        // GET: api/Group/1
        public IHttpActionResult Get(int id)
        {
            return Ok(_groupService.GetById(id));
        }

        // GET: api/Group?username=username
        public IHttpActionResult Get(string username)
        {
            var list = _groupService.GetByUser(username);

            return Ok(list);
        }

        // POST: api/Group
        public IHttpActionResult Post([FromBody]Group value)
        {
            _groupService.Add(value);
            return Ok(value);
        }

        // PUT: api/Group/5
        public IHttpActionResult Put(int id, [FromBody]Group value)
        {
            // TODO: rever implementação
            Group group =  _groupService.GetById(id);
            group.Name = value.Name;
            group.IsAdmin = value.IsAdmin;
            group.Permissions = value.Permissions;
            try
            {
                _groupService.Update(group);
            }
            catch (Exception ex)
            {
                for (; ex.InnerException != null; ex = ex.InnerException) { }
                throw ex;
            }

            return Ok(value);
        }

        // DELETE: api/Group/5
        public void Delete(int id)
        {
            _groupService.Delete(id);
        }
    }
}