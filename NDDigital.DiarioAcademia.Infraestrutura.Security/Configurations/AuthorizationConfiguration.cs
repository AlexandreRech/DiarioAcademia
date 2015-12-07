using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Configurations
{
    public class AuthorizationConfiguration : EntityTypeConfiguration<Claim>
    {
        public AuthorizationConfiguration()
        {
           ToTable("TBAuthorization");

            HasMany(x => x.Permissions)
                .WithMany().Map(x =>
                {
                    x.MapLeftKey("Authorization_Id");
                    x.MapRightKey("Permission_Id");
                    x.ToTable("TBAuthorizationPermission");
                });


        }
        
    }
}
