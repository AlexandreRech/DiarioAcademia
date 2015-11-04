using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class AulaProfiles : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Aula, AulaDTO>()
                 .ForMember(dto => dto.AnoTurma,
                            map => map
                                .MapFrom(x => x.Turma.Ano))
                 .ForMember(dto => dto.DataAula,
                            map => map
                                .MapFrom(x => x.Data))
              .ForMember(dto => dto.TurmaId,
                            map => map
                                .MapFrom(x => x.Turma.Id));

            Mapper.CreateMap<AulaDTO, Aula>()
               .ForMember(x => x.Turma,
                          map => map
                              .MapFrom(dto => dto.AnoTurma))
            .ForMember(x => x.Turma,
                          map => map
                              .MapFrom(dto => dto.Id))
               .ForMember(x => x.Data,
                          map => map
                              .MapFrom(dto => dto.DataAula));
        }
    }
}