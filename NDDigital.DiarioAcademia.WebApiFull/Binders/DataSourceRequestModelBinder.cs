using Kendo.DynamicLinq;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Net.Http;
using Newtonsoft.Json;

namespace NDDigital.DiarioAcademia.WebApiFull.Binders
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            if (actionContext.Request.RequestUri.ParseQueryString().Count == 0)
            {
                bindingContext.Model = null;

                return false;
            }

            string json = actionContext.Request.RequestUri.ParseQueryString().GetKey(0);

            DataSourceRequest request = JsonConvert.DeserializeObject<DataSourceRequest>(json);

            bindingContext.Model = request;

            return true;
        }
    }

}