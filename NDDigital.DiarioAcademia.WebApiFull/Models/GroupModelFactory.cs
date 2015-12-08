using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NDDigital.DiarioAcademia.WebApiFull.Models
{
    public class GroupReturnModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public string[] Claims { get; set; }

    }
}