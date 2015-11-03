using FizzWare.NBuilder;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;
using System;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests
{
    public class ObjectBuilder
    {
        public static Aula CriaUmaAula()
        {
            return new Aula(DateTime.Now, new Turma(2014));
        }

        public static ChamadaDTO CriaRegistraPresencaCommand(IList<int> ids)
        {
            var comando = Builder<ChamadaDTO>.CreateNew()
                .With(x => x.AnoTurma = 2014)
                .With(x => x.Data = new DateTime(2000, 10, 10))
                .Build();

            foreach (var id in ids)
            {
                comando.Alunos.Add(new ChamadaAlunoDTO { AlunoId = id, Status = "C" });
            }

            return comando;
        }

        internal static IList<Aluno> CriaListaAlunos(int qtdAlunos)
        {
            return Builder<Aluno>
                .CreateListOfSize(qtdAlunos)
                .All().With(
                    x => x.Presencas = new List<Presenca>())
                .Build();
        }

        internal static Turma CreateTurma()
        {
            return Builder<Turma>.CreateNew()
                .WithConstructor(() =>
                new Turma(2014)).Build();
        }

        internal static Aluno CreateAluno()
        {
            return Builder<Aluno>.CreateNew()
                .WithConstructor(() =>
                new Aluno()).Build();
        }

        internal static Aula CreateAula()
        {
            return Builder<Aula>.CreateNew()
                 .WithConstructor(() =>
                 new Aula()).Build();
        }
    }
}