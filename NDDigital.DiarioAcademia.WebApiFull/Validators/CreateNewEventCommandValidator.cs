using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using NDDigital.DiarioAcademia.WebApiFull.Models.Events;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class CreateNewEventCommandValidator : AbstractValidator<EventDTO>
    {
        public CreateNewEventCommandValidator()
        {
            RuleFor(x => x.Description)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.CriticyLevel)
                 .NotEmpty()
                .NotNull();

        }

    }
}