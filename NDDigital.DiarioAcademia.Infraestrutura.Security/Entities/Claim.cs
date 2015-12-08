using NDDigital.DiarioAcademia.Dominio.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Entities
{
    public class Claim : Entity
    {
        public string Name { get; set; }

        public IList<Permission> Permissions { get; set; }


        public Claim()
        {
            Permissions = new List<Permission>();
        }

        public Claim(string name) : this()
        {
            this.Name = name;
        }

        public Claim(string name, IList<Permission> permissions)
        {
            this.Name = name;
            this.Permissions = permissions;
        }

        public override bool Equals(object obj)
        {
            Claim autho = obj as Claim;
            if (autho != null && autho.Id == this.Id)
                return true;
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
