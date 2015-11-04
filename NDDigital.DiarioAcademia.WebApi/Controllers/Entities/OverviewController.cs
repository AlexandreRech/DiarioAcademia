using NDDigital.DiarioAcademia.Aplicacao.Services.Overview;
using NDDigital.DiarioAcademia.WebApi.Controllers.Base;
using NDDigital.DiarioAcademia.WebApi.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApi.Controllers.Entities
{
    [RoutePrefix("api/overview")]
    public class OverviewController : BaseEntityController
    {
        private IOverviewService _service;

        public OverviewController()
        {
            _service = new OverviewService(AlunoRepository,TurmaRepository,AulaRepository);
        }

        // GET: api/Overview
        [Route("summary")]
        public IHttpActionResult Get()
        {
            return Ok(_service.GetCounters());
        }
    }
}
