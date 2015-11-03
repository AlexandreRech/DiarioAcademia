
using FluentValidation;
using NDDigital.DiarioAcademia.WebApiFull.Models.CommandModels.Accounts;

namespace NDDigital.DiarioAcademia.WebApiFull.Models.Accounts
{
    public class RegisterNewAccountCommandValidator : AbstractValidator<RegisterNewAccountCommand>
    {
        public RegisterNewAccountCommandValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty();

            RuleFor(x => x.Password)
                .NotEmpty();

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password);
        }
    }
}