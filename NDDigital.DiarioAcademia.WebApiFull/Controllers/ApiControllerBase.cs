using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using Ninject.Extensions.Logging;
using NDDigital.DiarioAcademia.WebApiFull.Results;
using System;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {

        private readonly ILogger _logger;

        protected ILogger Logger
        {
            get { return _logger; }
        }

        protected ApiControllerBase(ILoggerFactory loggerFactory)
        {
            if (loggerFactory == null)
                throw new ArgumentNullException("loggerFactory", "loggerFactory is required");


            _logger = loggerFactory.GetLogger("AppTracerLogger");
        }

        protected string ControllerName
        {
            get
            {
                return ControllerContext.ControllerDescriptor.ControllerName;
            }
        }

        public string UserName
        {
            get
            {
                var principal = Request.GetRequestContext().Principal as ClaimsPrincipal;

                var userName = "";

                if (principal != null)
                {
                    userName = principal.Claims.Single(c => c.Type == "sub").Value;
                }

                return userName;
            }
        }

        protected virtual NotFoundTextPlainActionResult NotFound(string message)
        {
            return new NotFoundTextPlainActionResult(message, Request);
        }

    }
}
