using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.IntegrationTests.Base;

namespace NDDigital.DiarioAcademia.IntegrationTests.EF
{
    [TestClass]
    public class AlunoEFTest : BaseEFTest
    {
        private const string TestCategory = "Teste de Integração - Aluno";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Aluno_ORM_Test()
        {
            TurmaRepository.Add(ObjectBuilder.CreateTurma());

            Uow.Commit();

            var turmaEncontrada = TurmaRepository.GetById(2);

            var aluno = ObjectBuilder.CreateAluno(turmaEncontrada);

            aluno.Turma = turmaEncontrada;

            AlunoRepository.Add(aluno);

            Uow.Commit();

            Assert.IsNotNull(aluno);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aluno_ORM_Test()
        {
            var alunoEncontrado = AlunoRepository.GetById(1);

            Assert.IsNotNull(alunoEncontrado);
            Assert.AreEqual(1, alunoEncontrado.Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Aluno_ORM_Test()
        {
            var alunoEncontrado = AlunoRepository.GetById(1);
            alunoEncontrado.Nome = "Alexandre Regis";

            AlunoRepository.Update(alunoEncontrado);

            Uow.Commit();

            var alunoEditada = AlunoRepository.GetById(1);

            Assert.AreEqual("Alexandre Regis", alunoEditada.Nome);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todas_Alunos_ORM_Test()
        {
            var alunosEncontrados = AlunoRepository.GetAll();

            Assert.IsNotNull(alunosEncontrados);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Remover_Aluno_ORM_Test()
        {
            AlunoRepository.Add(new Aluno());

            Uow.Commit();

            var alunosEncontrados = AlunoRepository.GetAll();

            Assert.IsTrue(alunosEncontrados.Count == 2);

            AlunoRepository.Delete(1);

            Uow.Commit();

            alunosEncontrados = AlunoRepository.GetAll();

            Assert.IsTrue(alunosEncontrados.Count == 1);
        }
    }
}