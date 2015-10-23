using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Tracing;
using Ninject.Extensions.Logging;

namespace NDDigital.DiarioAcademia.WebApiFull.Loggers
{
    /// <summary>
    /// TraceWriter implementation using the Ninject logging extension.
    /// </summary>
    public class WebApiTracerLogger : ITraceWriter
    {
        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// All traces of Kind 'Begin'
        /// </summary>
        private readonly List<TraceRecord> beginTraces;

        /// <summary>
        /// Initializes a new instance of the <see cref="NinjectTraceLogger" /> class.
        /// </summary>
        public WebApiTracerLogger(ILoggerFactory loggerFactory)
        {
            this._logger = loggerFactory.GetLogger("WebApiTracerLogger");

            this.beginTraces = new List<TraceRecord>();
        }

        /// <summary>
        /// Determines whether the specified category is enabled.
        /// </summary>
        /// <param name="category">The category.</param>
        /// <param name="level">The level.</param>
        /// <returns>
        ///   <c>true</c> if the specified category is enabled; otherwise, <c>false</c>.
        /// </returns>
        public bool IsEnabled(string category, TraceLevel level)
        {
            return true;
        }

        /// <summary>
        /// Traces the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="category">The category.</param>
        /// <param name="level">The level.</param>
        /// <param name="traceAction">The trace action.</param>
        public void Trace(HttpRequestMessage request, string category, TraceLevel level, Action<TraceRecord> traceAction)
        {
            // Create trace record
            var record = new TraceRecord(request, category, level);

            // Execute trace action delegate
            if (traceAction != null)
            {
                traceAction(record);
            }

            // Calculate performance
            if (record.Kind == TraceKind.Begin)
            {
                this.beginTraces.Add(record);
            }

            // Log trace
            this.LogTrace(record);
        }

        /// <summary>
        /// Logs the trace.
        /// </summary>
        /// <param name="record">The trace record.</param>
        public virtual void LogTrace(TraceRecord record)
        {
            var method = record.Request != null ? record.Request.Method.Method : string.Empty;
            var uri = record.Request != null ? record.Request.RequestUri.AbsoluteUri : string.Empty;

            var message = string.Format("[{0}] {1}: {2} {3} {4}", record.Category, record.Kind, method, uri, string.IsNullOrEmpty(record.Message) ? string.Empty : " - " + record.Message);

            switch (record.Level)
            {
                case TraceLevel.Info:
                    this._logger.Info(message);
                    break;
                case TraceLevel.Debug:
                    this._logger.Debug(message);
                    break;
                case TraceLevel.Warn:
                    this._logger.Warn(message);
                    break;
                case TraceLevel.Error:
                    this._logger.Error(message);
                    break;
                case TraceLevel.Fatal:
                    this._logger.Fatal(message);
                    break;
            }

            // Add exception message if present
            if (record.Exception != null)
            {
                this._logger.Error(string.Format("{0}: {1}", record.Exception.Message, record.Exception.StackTrace));

                if (record.Exception.InnerException != null)
                {
                    this._logger.Error(string.Format("{0}: {1}", record.Exception.InnerException.Message, record.Exception.InnerException.StackTrace));
                }
            }

            // Write to system.diagnostics as well
            System.Diagnostics.Trace.WriteLine(message, record.Category);

            // Calculate performance
            if (record.Kind == TraceKind.End)
            {
                var begin = this.beginTraces.ToList().FirstOrDefault(r =>
                        (record.RequestId == r.RequestId && record.Category == r.Category &&
                         record.Operation == r.Operation && record.Operator == r.Operator));


                if (begin != null)
                {
                    // Log performance
                    this._logger.Info(string.Format("[{0}] {1}: {2} {3} - Request processing time: {4} s", record.Category, record.Kind, method, uri, record.Timestamp - begin.Timestamp));

                    // Remove begintrace
                    this.beginTraces.Remove(begin);
                }
            }
        }
    }
}