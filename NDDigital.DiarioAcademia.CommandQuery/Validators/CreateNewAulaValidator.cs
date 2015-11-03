using FluentValidation;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewAulaValidator : AbstractValidator<AulaDTO>
    {
        public CreateNewAulaValidator()
        {
            RuleFor(x => x.AnoTurma)
                .NotEmpty()
                .NotNull()
                .When(x => x.AnoTurma > 2000);

            RuleFor(x => x.TurmaId)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.DataAula)
                .NotEmpty()
                .NotNull();
        }
    }
}