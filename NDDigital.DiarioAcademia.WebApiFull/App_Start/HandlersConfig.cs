using NDDigital.DiarioAcademia.WebApiFull.Handlers;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull
{
    public static class HandlersConfig
    {
        public static void RegisterGlobalHandlers(HttpConfiguration config)
        {
            config.MessageHandlers.Add(new LanguageMessageHandler());
        }
    }
}