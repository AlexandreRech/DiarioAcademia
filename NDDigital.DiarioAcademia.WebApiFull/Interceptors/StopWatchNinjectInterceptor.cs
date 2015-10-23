using System.Diagnostics;
using Ninject.Extensions.Interception;
using Ninject.Extensions.Logging;

namespace NDDigital.DiarioAcademia.WebApiFull.Interceptors
{
    public class StopWatchNinjectInterceptor : SimpleInterceptor
    {
        private readonly Stopwatch _stopwatch;
        private readonly ILogger _logger;
        public StopWatchNinjectInterceptor(ILoggerFactory loggerFactory)
        {
            _stopwatch = new Stopwatch();
            _logger = loggerFactory.GetLogger("AppTracerLogger");
        }

        protected override void BeforeInvoke(IInvocation invocation)
        {
            var className = invocation.Request.Target.GetType().Name;
            var methodName = invocation.Request.Method.Name;

            _logger.Debug("Executando o serviço {0}, método {1} ", className, methodName);

            _stopwatch.Start();
        }

        protected override void AfterInvoke(IInvocation invocation)
        {
            var className = invocation.Request.Target.GetType().Name;
            var methodName = invocation.Request.Method.Name;

            _stopwatch.Stop();
            _logger.Debug(string.Format("Finalizando o serviço {0}, método {1}, tempo gasto {2} ms", className, methodName, _stopwatch.Elapsed.TotalMilliseconds));
            _stopwatch.Reset();
        }
    }
}