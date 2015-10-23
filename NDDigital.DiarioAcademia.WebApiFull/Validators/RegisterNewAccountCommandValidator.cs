using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using NDDigital.DiarioAcademia.WebApiFull.Models;
using NDDigital.DiarioAcademia.WebApiFull.Models.CommandModels.Accounts;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
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
                .NotEmpty();

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password);
        }
    }
}