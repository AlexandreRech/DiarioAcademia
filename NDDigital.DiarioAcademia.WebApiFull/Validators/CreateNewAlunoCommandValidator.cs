using FluentValidation;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewAlunoCommandValidator : AbstractValidator<AlunoDTO>
    {
        public CreateNewAlunoCommandValidator()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.TurmaId)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Bairro)
                 .NotEmpty()
                .NotNull();

            RuleFor(x => x.Localidade)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Uf)
          .NotEmpty()
          .NotNull();
        }
    }
}