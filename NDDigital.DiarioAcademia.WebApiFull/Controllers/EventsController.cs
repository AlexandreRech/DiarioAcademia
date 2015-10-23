using Kendo.DynamicLinq;
using Ninject.Extensions.Logging;
using System.Linq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using NDDigital.DiarioAcademia.WebApiFull.Models.Events;
using NDDigital.DiarioAcademia.WebApiFull.Services;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers
{
    [RoutePrefix("api/events")]
    public class EventsController : ApiControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService,
            ILoggerFactory loggerFactory
        )
            : base(loggerFactory)
        {
            _eventService = eventService;
        }

        [AutoFilterData]
        [Route("datasource")]
        public IHttpActionResult GetEventsDataSource([ModelBinder] DataSourceRequest @params)
        {
            var list = _eventService.GetEventsList();

            if (list == null || !list.Any())
            {
                return NotFound();
            }

            return Ok(list);
        }

        public IHttpActionResult GetAllEvents()
        {
            var list = _eventService.GetEventsList();

            if (list == null || !list.Any())
            {
                return NotFound();
            }

            return Ok(list);
        }
        
        [Route("{id:int}", Name = "GetEventById")]
        public IHttpActionResult GetEventById(int id)
        {
            var model = _eventService.GetEventResume(id);

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }
        public IHttpActionResult PostCreateNewEvent([FromBody]EventDTO eventCommand)
        {
            eventCommand = _eventService.CreateNewEvent(eventCommand);

            //var link = Url.Link("DefaultApi", new { controller = "Events", id = eventCommand.Id })

            var link = Url.Link("GetEventById", new { id = eventCommand.Id });

            return Created(link, eventCommand);
        }
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            //remove logic
            return Ok();
        }



    }
}