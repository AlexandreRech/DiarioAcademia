using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull
{
    public static class FiltersConfig
    {
        public static void RegisterGlobalFilters(HttpConfiguration config)
        {
            config.Filters.Add(new ValidateModelFilterAttribute());

            config.Filters.Add(new LoggingFilterAttribute());

        }
    }
}