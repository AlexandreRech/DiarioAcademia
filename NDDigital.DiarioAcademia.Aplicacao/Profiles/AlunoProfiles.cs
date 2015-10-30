using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class AlunoProfiles : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Aluno, AlunoDTO>()
                .ForMember(dto => dto.Descricao,
                           map => map
                               .MapFrom(x => x.ToString()))
                .ForMember(dto => dto.Localidade,
                           map => map
                               .MapFrom(x => x.Endereco.Localidade))
                .ForMember(dto => dto.Uf,
                           map => map
                               .MapFrom(x => x.Endereco.Uf))
                .ForMember(dto => dto.Bairro,
                           map => map
                               .MapFrom(x => x.Endereco.Bairro))
                .ForMember(dto => dto.TurmaId,
                           map => map
                               .MapFrom(x => x.Turma.Id));
        }
    } 
}