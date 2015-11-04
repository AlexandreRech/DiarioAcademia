using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contexts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using NDDigital.DiarioAcademia.WebApi.Providers;
using Owin;
using System;

namespace NDDigital.DiarioAcademia.WebApi.App_Start
{
    public static class OAuthConfig
    {
        public static OAuthAuthorizationServerOptions OAuthServerOptions { get; private set; }

        public static void ConfigureOAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(AuthContext.Create);
            app.CreatePerOwinContext<UserRepository>(UserRepository.Create);

            OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/oauth/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new CustomOAuthProvider(),
                AccessTokenFormat = new CustomJwtFormat("http://localhost:31648")
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}