using FluentValidation;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewTurmaValidator : AbstractValidator<TurmaDTO>
    {
        public CreateNewTurmaValidator()
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