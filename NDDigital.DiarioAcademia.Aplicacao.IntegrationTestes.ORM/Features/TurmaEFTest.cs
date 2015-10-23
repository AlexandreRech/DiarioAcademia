using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;

namespace Test
{
    [TestClass]
    public class TurmaEFTest : BaseEFTest
    {
        private const string TestCategory =
            "Teste de Integração Turma";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Turma_ORM_Test()
        {
            var turma = ObjectBuilder.CreateTurma();

            TurmaRepository.Add(turma);

            Uow.Commit();

            var qtdTurmas = TurmaRepository.GetAll().Count;

            Assert.AreEqual(2, qtdTurmas);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Turma_ORM_Test()
        {
            var turmaEncontrada = TurmaRepository.GetById(1);

            Assert.IsNotNull(turmaEncontrada);
            Assert.AreEqual(1, turmaEncontrada.Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Turma_ORM_Test()
        {
            var turmaEncontrada = TurmaRepository.GetById(1);
            turmaEncontrada.Ano = 2016;

            TurmaRepository.Update(turmaEncontrada);
            Uow.Commit();

            var turmaEditada = TurmaRepository.GetById(1);

            Assert.AreEqual(2016, turmaEditada.Ano);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todas_Turmas_ORM_Test()
        {
            var turmasEncontradas = TurmaRepository.GetAll();

            Assert.AreEqual(1, turmasEncontradas.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Remover_Turma_ORM_Test()
        {
            var turma = ObjectBuilder.CreateTurma();

            TurmaRepository.Add(turma);
            Uow.Commit();

            var turmasEncontradas = TurmaRepository.GetAll();

            Assert.AreEqual(2, turmasEncontradas.Count);

            TurmaRepository.Delete(2);

            Uow.Commit();

            turmasEncontradas = TurmaRepository.GetAll();

            Assert.AreEqual(1, turmasEncontradas.Count);
        }
    }
}