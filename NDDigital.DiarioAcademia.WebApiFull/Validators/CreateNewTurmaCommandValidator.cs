using FluentValidation;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewTurmaCommandValidator : AbstractValidator<TurmaDTO>
    {
        public CreateNewTurmaCommandValidator()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Ano)
                 .NotEmpty()
                .NotNull()
                .When(x => x.Ano > 2000);
        }
    }
}