using FluentValidation;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NDDigital.DiarioAcademia.WebApiFull.Validators
{
    public class RegisterChamadaCommandValidator : AbstractValidator<ChamadaDTO>
    {
        public RegisterChamadaCommandValidator()
        {
            RuleFor(x => x.Alunos)
               .NotNull();

            RuleFor(x => x.AnoTurma)
                .NotEmpty();

            RuleFor(x => x.AulaId)
                .NotEmpty();
            
            RuleFor(x => x.TurmaId)
                .NotEmpty();

            RuleFor(x => x.Data)
                .Must(x => x.Date.Year > 2000)
                .NotEmpty();
        }
    }
}