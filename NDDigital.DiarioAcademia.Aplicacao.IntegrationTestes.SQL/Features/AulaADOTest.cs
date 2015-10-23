using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System;

namespace NDDigital.DiarioAcademia.IntegrationTests.ADO
{
    [TestClass]
    public class AulaADOTest : BaseADOTest
    {
        private const string TestCategory = "Teste de Integração Aula";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Aula_SQL_Test()
        {
            TurmaRepository.Add(ObjectBuilder.CreateTurma());

            var turmaEncontrada = TurmaRepository.GetById(1);

            var aula = ObjectBuilder.CreateAula(turmaEncontrada);

            aula.Turma = turmaEncontrada;

            AulaRepository.Add(aula);

            var aulas = AulaRepository.GetAll();

            Uow.Commit();

            Assert.AreEqual(2, aulas.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aula_SQL_Test()
        {
            var aulaEncontrada = AulaRepository.GetById(1);

            Assert.IsNotNull(aulaEncontrada);
            Assert.AreEqual(1, aulaEncontrada.Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Aula_SQL_Test()
        {
            var aulaEncontrada = AulaRepository.GetById(1);
            aulaEncontrada.Data = DateTime.Now.AddYears(-15);

            AulaRepository.Update(aulaEncontrada);

            var aulaEditada = AulaRepository.GetById(1);

            Uow.Commit();

            Assert.AreEqual(2000, aulaEditada.Data.Year);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todas_Aulas_SQL_Test()
        {
            var aulasEncontradas = AulaRepository.GetAll();

            Assert.IsNotNull(aulasEncontradas);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aula_Com_Presencas_SQL_Test()
        {
            var aulaEncontrada = AulaRepository.GetById(1);

            Assert.IsNotNull(aulaEncontrada.Presencas);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Remover_Aula_SQL_Test()
        {
            AulaRepository.Delete(1);

            var aulasEncontradas = AulaRepository.GetAll();

            Uow.Commit();

            Assert.IsTrue(aulasEncontradas.Count == 0);
        }
    }
}