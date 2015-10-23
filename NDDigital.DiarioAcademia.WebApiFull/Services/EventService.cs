using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NDDigital.DiarioAcademia.WebApiFull.Models.Events;

namespace NDDigital.DiarioAcademia.WebApiFull.Services
{
    public interface IEventService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IEnumerable<EventDTO> GetEventsList();



        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        EventDTO GetEventResume(int id);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="eventModel"></param>
        /// <returns></returns>
        EventDTO CreateNewEvent(EventDTO eventModel);
    }

    public class EventServiceStub : IEventService
    {
        private Random rnd = new Random();
        public IEnumerable<EventDTO> GetEventsList()
        {

            var messages = new[]
            {
                "está sem papel", "Está sem toner azul", "está sem comunicação", "é desconhecida", "está com papel atolado",
                "não envia notificações"
            };

            var printers = new[] { "Ricoh Aficio MP", "Kyocera", "Thoshiba", "Lexmark" };
            var levels = new[] { "Success", "Info", "Warning", "Danger" };

            for (int i = 0; i < 10; i++)
            {
                string timeMessage = string.Format("{0}{1} horas atrás",rnd.Next(0,2), i + 1);
                


                yield return new EventDTO
                {
                    Id = i,
                    DateEventOccurrence = DateTime.Now.AddHours(-10 + i).ToShortDateString(),
                    Type = "System Event",
                    PrinterName = printers[rnd.Next(0,4)]+"300" + i + 1,
                    CriticyLevel = levels[rnd.Next(0,4)],
                    Description = "Esta impressora "+messages[rnd.Next(0,6)]+".",
                    TimeElapsed = timeMessage
                };
            }
        }

        public EventDTO GetEventResume(int id)
        {
            var model = new EventDTO
            {
                Id = id,
                DateEventOccurrence = DateTime.Now.ToShortDateString(),
                Type = "System Event",
                PrinterName = "Ricoh Aficio MP",
                CriticyLevel = "Warning",
                Description = "Esta impressora está desaconectada",
                TimeElapsed = "4 dias atrás"
            };

            return model;
        }

        public EventDTO CreateNewEvent(EventDTO eventCommand)
        {
            eventCommand.Id = rnd.Next(1000);

            return eventCommand;
        }
    }

}