using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;

namespace NDDigital.DiarioAcademia.IntegrationTests.ADO
{
    [TestClass]
    public class AlunoADOTest : BaseADOTest
    {
        private const string TestCategory = "Teste de Integração Aluno";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Aluno_SQL_Test()
        {
            TurmaRepository.Add(ObjectBuilder.CreateTurma());

            var turmaEncontrada = TurmaRepository.GetById(1);

            var aluno = ObjectBuilder.CreateAluno(turmaEncontrada);

            AlunoRepository.Add(aluno);

            var alunos = AlunoRepository.GetAll();

            Uow.Commit();

            Assert.AreEqual(2, alunos.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aluno_SQL_Test()
        {
            var alunoEncontrado = AlunoRepository.GetById(1);

            Assert.IsNotNull(alunoEncontrado);
            Assert.AreEqual(1, alunoEncontrado.Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Aluno_SQL_Test()
        {
            var alunoEncontrado = AlunoRepository.GetById(1);
            alunoEncontrado.Nome = "Alexandre Regis";

            AlunoRepository.Update(alunoEncontrado);

            var alunoEditado = AlunoRepository.GetById(1);

            Uow.Commit();

            Assert.AreEqual("Alexandre Regis", alunoEditado.Nome);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todos_Alunos_SQL_Test()
        {
            var alunosEncontrados = AlunoRepository.GetAll();

            Assert.IsNotNull(alunosEncontrados);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aluno_Com_Presencas_SQL_Test()
        {
            var alunoEncontrado = AlunoRepository.GetById(1);

            Assert.IsNotNull(alunoEncontrado.Presencas);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Remover_Aluno_SQL_Test()
        {
            AlunoRepository.Delete(1);

            var alunosEncontrados = AlunoRepository.GetAll();

            Uow.Commit();

            Assert.IsTrue(alunosEncontrados.Count == 0);
        }
    }
}