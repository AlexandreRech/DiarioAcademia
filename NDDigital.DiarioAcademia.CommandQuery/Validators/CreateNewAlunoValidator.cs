using FluentValidation;
using FluentValidation.Attributes;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewAlunoValidator : AbstractValidator<AlunoDTO>
    {
        public CreateNewAlunoValidator()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty()
                .NotNull();


            RuleFor(x => x.Descricao.Length)
                .GreaterThanOrEqualTo(10);

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