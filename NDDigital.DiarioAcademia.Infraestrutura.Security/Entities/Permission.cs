using NDDigital.DiarioAcademia.Dominio.Common;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Entities
{
    public class Permission : Entity
    {
        public string PermissionId { get; set; }

        public override string ToString()
        {
            return PermissionId;
        }

        public override bool Equals(object obj)
        {
            Permission permission = obj as Permission;
            if (permission != null && permission.PermissionId == this.PermissionId)
                return true;
            return base.Equals(obj);
        }
        public Permission()
        {
        }

        public Permission(string id)
        {
            PermissionId = id;
        }
    }
}