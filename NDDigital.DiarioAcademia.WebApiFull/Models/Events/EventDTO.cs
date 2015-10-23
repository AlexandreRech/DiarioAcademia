using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NDDigital.DiarioAcademia.WebApiFull.Models.Events
{
    public class EventDTO
    {
        public int Id { get; set; }
        //Tipo {System Event , Printer Event, User Event}
        public string Type { get; set; }

        public string Description { get; set; }

        //Data de Ocorrencia
        public string DateEventOccurrence { get; set; }

        //Tempo Decorrido da Data de Ocorrencia
        public string TimeElapsed { get; set; }

        public string CriticyLevel { get; set; }

        public string PrinterName { get; set; }

    }
}