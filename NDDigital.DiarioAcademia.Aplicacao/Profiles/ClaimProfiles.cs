using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class ClaimProfiles : Profile
    {
        protected override void Configure()
        {
            //Main Mappers
            Mapper.CreateMap<Claim, ClaimDTO>()
                .ForMember(dto => dto.Id,
                           map => map.MapFrom(x => x.Id))
                 .ForMember(dto => dto.Name,
                           map => map.MapFrom(x => x.Name))
                 .ForMember(dto => dto.Permissions,
                           map => map.MapFrom(x => x.Permissions.Select(p => p.PermissionId).ToArray()));

        }
    }
}
