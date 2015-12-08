using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Aplicacao.DTOs.Security
{
    public class ClaimDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string[] Permissions { get; set; }

        public ClaimDTO()
        {

        }
        public ClaimDTO(Claim auth)
        {
            this.Id = auth.Id;
            this.Name = auth.Name;
            this.Permissions = auth.Permissions.Select(p => p.PermissionId).ToArray();
        }
    }
}
