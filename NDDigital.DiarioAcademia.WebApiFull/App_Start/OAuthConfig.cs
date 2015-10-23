using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using NDDigital.DiarioAcademia.WebApiFull.Providers;
using System;

namespace NDDigital.DiarioAcademia.WebApiFull
{
    public static class OAuthConfig
    {
        public static void ConfigureOAuth(IAppBuilder app)
        {
            var oAuthServerOptions = new OAuthAuthorizationServerOptions
            {

                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(30),
                Provider = new SimpleAuthorizationServerProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(oAuthServerOptions);

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}