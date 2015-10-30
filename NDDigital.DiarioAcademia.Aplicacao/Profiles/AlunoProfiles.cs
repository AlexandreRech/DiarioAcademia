using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles
{
   public class AlunoProfiles:Profile
    {


        protected override void Configure()
        {
            Mapper.CreateMap<Aluno, AlunoDTO>();



        }


    }
}
