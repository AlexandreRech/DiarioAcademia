using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Script.Serialization;
using Ninject;
using Ninject.Extensions.Logging;
using NDDigital.DiarioAcademia.WebApiFull.Services;
using Kendo.DynamicLinq;

namespace NDDigital.DiarioAcademia.WebApiFull.Filters
{

    /// <summary>
    /// Access to the log4Net logging object
    /// </summary>
    public class LoggingFilterAttribute : ActionFilterAttribute
    {
        private const string StopwatchKey = "DebugLoggingStopWatch";

        [Inject]
        public ILoggerFactory LoggerFactory { get; set; }

        private ILogger Logger
        {
            get
            {
                return LoggerFactory.GetLogger("AppTracerLogger");
            }
        }

        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            if (Logger.IsDebugEnabled)
            {
                var loggingWatch = Stopwatch.StartNew();

                filterContext.Request.Properties[StopwatchKey] = loggingWatch;

                var controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                var actionName = filterContext.ActionDescriptor.ActionName;

                var message = new StringBuilder();

                message.AppendFormat("Executando o controller {0}, action {1} ", controllerName, actionName);

                foreach (var key in filterContext.ActionArguments.Keys)
                {
                    message.AppendFormat("Parâmetros: {0} ", key);

                    var request = filterContext.ActionArguments[key] as DataSourceRequest;

                    if (request != null)
                    {                 
                        //TODO: Implementar log do contexto do filtro                            
                    }

                }

                Logger.Debug(message.ToString());
            }
        }

        
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            if (Logger.IsDebugEnabled)
            {
                if (filterContext.Request.Properties.ContainsKey(StopwatchKey))
                {
                    var loggingWatch = (Stopwatch)filterContext.Request.Properties[StopwatchKey];

                    loggingWatch.Stop();

                    long timeSpent = loggingWatch.ElapsedMilliseconds;

                    var message = new StringBuilder();

                    var controllerName = filterContext.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                    var actionName = filterContext.ActionContext.ActionDescriptor.ActionName;
                    var statusCode = filterContext.Response.StatusCode;

                    message.AppendFormat("Finalizando o controller {0}, action {1}, status {2}, tempo gasto {3} milisegundos", controllerName, actionName, statusCode, timeSpent);

                    Logger.Debug(message.ToString());

                    filterContext.Request.Properties.Remove(StopwatchKey);
                }
            }
        }

        #region métodos privados
        private void SerializeDataSourceRequest<T>(string parameter, StringBuilder message, IEnumerable<T> parameterList)
        {
            if (parameterList != null && parameterList.Any())
                message.AppendFormat("{0}: {1}", parameter, new JavaScriptSerializer().Serialize(parameterList));
        }

        #endregion
    }
}

