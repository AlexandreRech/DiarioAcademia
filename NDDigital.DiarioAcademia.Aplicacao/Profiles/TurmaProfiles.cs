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

            Mapper.CreateMap<Turma, TurmaDTO>();
        }
    }
}