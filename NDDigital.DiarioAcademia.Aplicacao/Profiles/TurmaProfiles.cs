using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class TurmaProfiles : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<TurmaDTO, Turma>();
            //  .ForMember(dto => dto.Id,
            //             map => map
            //                 .MapFrom(x => x.Id))
            //  .ForMember(dto => dto.Ano,
            //             map => map
            //                 .MapFrom(x => x.Ano));

            Mapper.CreateMap<Turma, TurmaDTO>();
            //  .ForMember(x => x.Id,
            //             map => map
            //                 .MapFrom(dto => dto.Id))
            //  .ForMember(x => x.Ano,
            //             map => map
            //                 .MapFrom(dto => dto.Ano));
        }
    }
}