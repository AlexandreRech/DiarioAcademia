using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using NDDigital.DiarioAcademia.WebApiFull.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Security
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseSecurityController
    {
        private IAuthorizationService _authservice;
        private IPermissionService _permissionService;
        private IGroupService _groupService;

        public AccountsController()
        {
            _authservice = new AuthorizationService(GroupRepository, PermissionRepository, AccountRepository, Uow);
            _permissionService = new PermissionService(PermissionRepository, Uow);
            _groupService = new GroupService(GroupRepository, Uow);
        }

        [Route("user")]
        [GrouperAuthorize(Claim.Account_Get)]
        public IHttpActionResult GetUsers()
        {
            var users = UserRepository.GetUsers();
            return Ok(users.Select(u => TheModelFactory.Create(u)));
        }

        [GrouperAuthorize(Claim.Account_Get)]
        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)
            var user = this.UserRepository.GetUserById(Id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [GrouperAuthorize(Basic = true)]
        [Route("user/username/{username}")]
        public IHttpActionResult GetUserByName(string username)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)
            var user = this.UserRepository.GetUserByUsername(username);
            if (user == null)
                return NotFound();
            var model = TheModelFactory.Create(user);
            model.IsAdmin = _groupService.isAdmin(username);
            model.Permissions = _permissionService.GetByUser(username);
            return Ok(model);
        }

        [AllowAnonymous]
        [Route("create")]
        public IHttpActionResult CreateUser(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid || model == null)
            {
                return BadRequest(ModelState);
            }

            var user = new User()
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PasswordHash = Criptografia.Criptografar(model.Password)
            };

            // IdentityResult addUserResult =  this.UserRepository.Create(user, createUserModel.Password);

            UserRepository.AddUser(user);

            // if (!addUserResult.Succeeded)
            // {
            //     return GetErrorResult(addUserResult);
            // }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }

        [Route("ChangePassword")]
        [GrouperAuthorize(Basic = true)]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserRepository.GetUserByUsername( model.Username);

            user.PasswordHash = Criptografia.Criptografar(model.NewPassword);

            UserRepository.Update(user);

            return Ok();
        }

        [Route("user/{id:guid}")]
        [GrouperAuthorize(Claim.Account_Delete)]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            UserRepository.Delete(id);


            return Ok();
        }

        //[GrouperAuthorize(Claim.Manager_User_Edit)]
        public IHttpActionResult EditUser([FromBody] User user)
        {
            if (user == null) return BadRequest();

            var u = UserRepository.GetUserById(user.Id);

            u.FirstName = user.FirstName;
            u.LastName = user.LastName;
            u.Email = user.Email;
            u.UserName = u.Account.Username=user.UserName;

            UserRepository.Update(u);

            return Ok(user);
        }
    }
}