using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using NDDigital.DiarioAcademia.WebApiFull.Models.CommandModels.Accounts;
using NDDigital.DiarioAcademia.WebApiFull.Services;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers
{
    //[RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private readonly IAuthService _service;

        public AccountController(IAuthService authService)
        {
            _service = authService;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        public IHttpActionResult PostRegisterNewAccount(RegisterNewAccountCommand accountCommand)
        {
            IdentityResult result = _service.RegisterUser(accountCommand);

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _service.Dispose();
            }

            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
