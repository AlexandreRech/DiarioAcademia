using Kendo.DynamicLinq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace NDDigital.DiarioAcademia.WebApiFull.Filters
{
    public class AutoFilterData : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            if (ActionNotStartsWithGetAll(filterContext))
                throw new InvalidOperationException("[AutoFilterData] deve ser usado apenas em ações que iniciem com \" Get \" ");

            var paramFound = GetDataSourceRequestParam(filterContext.ActionContext.ActionArguments);

            if (paramFound == null)
                throw new InvalidOperationException("[AutoFilterData] só pode ser usado quando um parâmetro do tipo \" DataSourceRequest \" foi informado");

            IEnumerable<object> content;

            if (filterContext.Response.TryGetContentValue(out content))
            {                
                var objectContent = filterContext.Response.Content as ObjectContent;

                if (objectContent != null)
                {                  
                    objectContent.Value = content.AsQueryable().ToDataSourceResult(paramFound);
                }
            }
            else
            {
                //lança exceção
            }

            base.OnActionExecuted(filterContext);
        }

        private static bool ActionNotStartsWithGetAll(HttpActionExecutedContext filterContext)
        {
            return !filterContext.Request.Method.Method.ToUpper().StartsWith("GET");
        }


        private DataSourceRequest GetDataSourceRequestParam(Dictionary<string, object> dictionary)
        {
            DataSourceRequest @param = null;

            Type dataSourceRequestType = typeof(DataSourceRequest);

            foreach (var item in dictionary)
            {
                if (item.Value.GetType().Equals(dataSourceRequestType))
                {
                    @param = (DataSourceRequest)item.Value;
                    break;
                }
            }

            return @param;
        }
    }
}