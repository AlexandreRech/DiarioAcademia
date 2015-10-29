using Owin;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using NDDigital.DiarioAcademia.WebApiFull.DependencyResolution;
using System.Web.Http;
using NDDigital.DiarioAcademia.WebApiFull.App_Start;

[assembly: OwinStartup(typeof(NDDigital.DiarioAcademia.WebApiFull.Startup))]
namespace NDDigital.DiarioAcademia.WebApiFull
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            OAuthConfig.ConfigureOAuth(app);

            HandlersConfig.RegisterGlobalHandlers(config);

            RoutesConfig.Register(config);

            FormattersConfig.Configure(config);

            FiltersConfig.RegisterGlobalFilters(config);

            BindersConfig.RegisterGlobalBinders(config);

            TracingConfig.Configure();

            TokenConfig.ConfigureOAuthTokenConsumption(app);

            app.UseCors(CorsOptions.AllowAll);

            app.UseNinjectMiddleware(IoC.CreateKernel);

            app.UseNinjectWebApi(config);


        }


    }
}