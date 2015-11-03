using FluentValidation.Attributes;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.WebApiFull.Validators;

namespace NDDigital.DiarioAcademia.Aplicacao.DTOs
{
    [Validator(typeof(CreateNewTurmaValidator))]
    public class TurmaDTO
    {
        public TurmaDTO()
        {
        }

        public TurmaDTO(int id)
        {
            Id = id;
        }

        public TurmaDTO(Turma turma)
        {
            Id = turma.Id;
            Ano = turma.Ano;
        }

        public string Descricao { get { return "Academia do Programador " + Ano; } }

        public int Id { get; set; }

        public override bool Equals(object obj)
        {
            var turma = obj as TurmaDTO;

            if (turma == null)
                return false;

            return this.Id == turma.Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public int Ano { get; set; }

        public override string ToString()
        {
            return "Academia do Programador " + Ano;
        }
    }
}