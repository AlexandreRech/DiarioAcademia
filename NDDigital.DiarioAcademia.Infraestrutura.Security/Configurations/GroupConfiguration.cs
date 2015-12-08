using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Data.Entity.ModelConfiguration;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Configurations
{
    internal class GroupConfiguration : EntityTypeConfiguration<Group>
    {
        public GroupConfiguration()
        {
            ToTable("TBGroup");

            HasMany(x => x.Claims)
                .WithMany().Map(x =>
                {
                    x.MapLeftKey("Group_Id");
                    x.MapRightKey("Claim_Id");
                    x.ToTable("TBGroupClaim");
                });
        }
    }
}