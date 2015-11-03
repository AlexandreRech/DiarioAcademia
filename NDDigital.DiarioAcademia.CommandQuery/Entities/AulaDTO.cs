using FluentValidation.Attributes;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.WebApiFull.Validators;
using System;

namespace NDDigital.DiarioAcademia.Aplicacao.DTOs
{
    [Validator(typeof(CreateNewAulaValidator))]
    public class AulaDTO
    {
        public AulaDTO()
        {
        }

        public AulaDTO(Aula aula)
        {
            DataAula = aula.Data;
            Id = aula.Id;
            AnoTurma = aula.Turma.Ano;
            TurmaId = aula.Turma.Id;
        }

        public int Id { get; set; }

        public DateTime DataAula { get; set; }

        public int AnoTurma { get; set; }

        public int TurmaId { get; set; }

        public override string ToString()
        {
            return DataAula.ToString("dd/MM/yyyy");
        }
    }
}