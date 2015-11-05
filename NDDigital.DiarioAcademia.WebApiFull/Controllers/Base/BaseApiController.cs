using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using NDDigital.DiarioAcademia.WebApiFull.Models;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers
{
    public class BaseApiController : ApiController
    {
        private ModelFactory _modelFactory;
        private UserRepository _userRepository = null;

        #region Constructor Requirements

        protected IUnitOfWork Uow;

        #endregion Constructor Requirements

       

        protected UserRepository UserRepository
        {
            get
            {
                return _userRepository ?? Request.GetOwinContext().GetUserManager<UserRepository>();
            }
        }

        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(Request, this.UserRepository);
                }
                return _modelFactory;
            }
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
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