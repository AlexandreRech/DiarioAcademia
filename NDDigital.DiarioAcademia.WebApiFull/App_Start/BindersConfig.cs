using Kendo.DynamicLinq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.ModelBinding.Binders;
using CustomBinders = NDDigital.DiarioAcademia.WebApiFull.Binders;

namespace NDDigital.DiarioAcademia.WebApiFull.App_Start
{
    public static class BindersConfig
    {
        public static void RegisterGlobalBinders(HttpConfiguration config)
        {
            var type = typeof(DataSourceRequest);

            var modelBinder = new CustomBinders.DataSourceRequestModelBinder();

            var provider = new SimpleModelBinderProvider(type, modelBinder);

            config.Services.Insert(typeof(ModelBinderProvider), 0, provider);

        }
    }
}