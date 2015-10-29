using NDDigital.DiarioAcademia.Dominio.Entities;
using System.Linq;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace NDDigital.DiarioAcademia.WebApiFull
{
    public static class RoutesConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Web API configuration and services
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();

            builder.EntitySet<Aluno>("Aluno");

            config.MapODataServiceRoute(
              routeName: "ODataRoute",
              routePrefix: "odata",
              model: builder.GetEdmModel());
        }
    }
}