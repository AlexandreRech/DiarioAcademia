using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using FluentValidation.Results;
using FluentValidation.WebApi;
using FluentValidation.Attributes;
using System;

namespace NDDigital.DiarioAcademia.WebApiFull.Filters
{
    public class ValidateModelFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.Request.Method.Method == "GET" ||
                actionContext.Request.Method.Method == "DELETE")
            {
                return;
            }

            if (actionContext.ModelState.IsValid == false)
            {
                var modelFound = GetModelWithValidateAttribute(actionContext.ActionArguments);

                if (modelFound != null)
                {
                    var validationResults = ValidateModel(modelFound);

                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, validationResults);
                }
            }
        }

        private object GetModelWithValidateAttribute(System.Collections.Generic.Dictionary<string, object> dictionary)
        {
            object model = null;

            foreach (var item in dictionary)
            {
                Type t = item.Value.GetType();

                ValidatorAttribute attribute = (ValidatorAttribute)Attribute.GetCustomAttribute(t, typeof(ValidatorAttribute));

                if (attribute != null)
                {
                    model = dictionary[item.Key];
                    break;
                }
            }

            return model;
        }

        private static ValidationResult ValidateModel(object model)
        {
            var servicesContainer = GlobalConfiguration.Configuration.Services;

            var validatorFactory = servicesContainer.GetModelValidatorProviders()
                 .OfType<FluentValidationModelValidatorProvider>()
                 .First()
                 .ValidatorFactory;

            var validator = validatorFactory.GetValidator(model.GetType());

            ValidationResult validationResults = validator.Validate(model);

            return validationResults;
        }
    }
}