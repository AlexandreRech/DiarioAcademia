using NDDigital.DiarioAcademia.Dominio;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts
{
    public interface IPermissionRepository : IRepository<Permission>
    {
        void checkPermissions(string[] permissions);

        IList<Permission> GetByGroup(int groupId);

        IList<Permission> GetAllSpecific(string[] permissions);

        Permission GetByPermissionId(string v);

        IList<Permission> GetByUser(string username);
    }
}