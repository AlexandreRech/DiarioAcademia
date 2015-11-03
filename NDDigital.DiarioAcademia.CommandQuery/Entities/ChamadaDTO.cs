using FluentValidation.Attributes;
using NDDigital.DiarioAcademia.WebApiFull.Validators;
using System;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.Aplicacao.DTOs
{
    [Validator(typeof(RegisterChamadaValidator))]

    public class ChamadaDTO
    {
        public ChamadaDTO()
        {
            Alunos = new List<ChamadaAlunoDTO>();
        }

        public int AnoTurma { get; set; }

        public int TurmaId { get; set; }

        public DateTime Data { get; set; }

        public List<ChamadaAlunoDTO> Alunos { get; set; }

        public int AulaId { get; set; }

        public bool ChamadaRealizada { get; set; }
    }

    public class ChamadaAlunoDTO
    {
        public ChamadaAlunoDTO()
        {
        }

        public ChamadaAlunoDTO(int alunoId, string nome, string status)
        {
            AlunoId = alunoId;
            Nome = nome;
            Status = status;
        }

        public int AlunoId { get; set; }

        public string Nome { get; set; }

        public string Status { get; set; }

        public override string ToString()
        {
            return string.Format("{0}: {1}", Nome, Status == "F" ? "Faltou" : "Presente");
        }

        public override bool Equals(object obj)
        {
            ChamadaAlunoDTO chamada = obj as ChamadaAlunoDTO;
            if (chamada != null && chamada.AlunoId == this.AlunoId)
                return true;
            return base.Equals(obj);
        }
    }
}