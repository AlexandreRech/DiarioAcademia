using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using NDDigital.DiarioAcademia.Aplicacao.Profiles;
using NDDigital.DiarioAcademia.WebApi.App_Start;
using Owin;
using System.Configuration;
using System.Web.Http;

[assembly: OwinStartup(typeof(NDDigital.DiarioAcademia.WebApi.Startup))]

namespace NDDigital.DiarioAcademia.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            OAuthConfig.ConfigureOAuth(app);

            RoutesConfig.Register(config);

            FormattersConfig.Configure(config);

            TokenConfig.ConfigureOAuthTokenConsumption(app);

            AutoMapperConfig.ConfigMappers();

            app.UseCors(CorsOptions.AllowAll);

            app.UseWebApi(config);
        }

       
    }
}