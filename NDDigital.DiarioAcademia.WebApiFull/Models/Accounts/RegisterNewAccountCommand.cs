using FluentValidation.Attributes;
using NDDigital.DiarioAcademia.WebApiFull.Models.Accounts;
using NDDigital.DiarioAcademia.WebApiFull.Validators;

namespace NDDigital.DiarioAcademia.WebApiFull.Models.CommandModels.Accounts
{
    [Validator(typeof(RegisterNewAccountCommandValidator))]
    public class RegisterNewAccountCommand
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}

