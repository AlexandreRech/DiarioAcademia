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
              //  .ForMember(dto => dto.Id,
              //             map => map
              //                 .MapFrom(x => x.Id))
              //  .ForMember(dto => dto.Ano,
              //             map => map
              //                 .MapFrom(x => x.Ano));
        }
    }
}