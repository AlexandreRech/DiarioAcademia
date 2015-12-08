using NDDigital.DiarioAcademia.Dominio;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts
{
    public interface IClaimRepository : IRepository<Claim>
    {
        List<Claim> GetByGroup(int groupId);

        List<Claim> GetByUser(string username);

        List<Claim> GetAllSpecific(string[] authorizations);

        Claim GetByName(string name);

        List<Claim> GetByPermissionId(string permissionId);
    }
}
