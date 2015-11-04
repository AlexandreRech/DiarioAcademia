using System;
using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
    public class AlunoProfiles : Profile
    {
        protected override void Configure()
        {

            //Main Mappers
            Mapper.CreateMap<Aluno, AlunoDTO>()
                 .ForMember(dto => dto.Id,
                           map => map.MapFrom(x => x.Id))
                .ForMember(dto => dto.Descricao,
                           map => map.MapFrom(x => x.ToString()))
                .ForMember(dto => dto.Localidade,
                           map => map.MapFrom(x => x.Endereco.Localidade))
                .ForMember(dto => dto.Uf,
                           map => map.MapFrom(x => x.Endereco.Uf))
                .ForMember(dto => dto.Bairro,
                           map => map.MapFrom(x => x.Endereco.Bairro))
                .ForMember(dto => dto.TurmaId,
                           map => map.MapFrom(x => x.Turma.Id));


            Mapper.CreateMap<AlunoDTO, Aluno>()
                .ForMember(x => x.Nome,
                            map => map.MapFrom(dto => dto.Descricao.Split(':')[0].Trim()))
                .ForMember(x => x.Endereco,
                            map => map.MapFrom(dto => Mapper.Map<Endereco>(dto)))
                            ;
            //Sub mappers
            Mapper.CreateMap<AlunoDTO, Endereco>();
        }


        public class ExtractLocalidade : ValueResolver<Endereco, string>
        {
            protected override string ResolveCore(Endereco source)
            {
                return source.Localidade;
            }
        }
        public class ExtractUf: ValueResolver<Endereco, string>
        {
            protected override string ResolveCore(Endereco source)
            {
                return source.Uf;
            }
        }
        public class ExtractBairro: ValueResolver<Endereco, string>
        {
            protected override string ResolveCore(Endereco source)
            {
                return source.Bairro;
            }
        }
    } 
}