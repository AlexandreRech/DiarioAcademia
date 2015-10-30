using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class ChamadaProfiles : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Aula, ChamadaDTO>()
                  .ForMember(dto => dto.AulaId,
                            map => map
                                .MapFrom(x => x.Data))
                  .ForMember(dto => dto.AnoTurma,
                            map => map
                                .MapFrom(x => x.Turma.Ano))
                  .ForMember(dto => dto.AulaId,
                            map => map
                                .MapFrom(x => x.Id))
                  .ForMember(dto => dto.ChamadaRealizada,
                            map => map
                                .MapFrom(x => x.ChamadaRealizada));
        }
    }
}