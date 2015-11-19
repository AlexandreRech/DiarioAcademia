using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NDDigital.DiarioAcademia.WebApiFull.Models
{
    public class PermissionFilterModel
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public PermissionFilterModel(string filter, string displayName)
        {
            this.Name = filter;
            this.DisplayName = displayName;
        }
    }
}