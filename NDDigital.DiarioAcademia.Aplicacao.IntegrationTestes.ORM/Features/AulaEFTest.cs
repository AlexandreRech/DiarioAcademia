using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Entities;
using System;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    [TestClass]
    public class AulaEFTest : BaseEFTest
    {
        public const string TestCategory =
            "Teste de Integração - Aula";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Aula_ORM_Test()
        {
            var turmaEncontrada = TurmaRepository.GetById(1);

            var aula = ObjectBuilder.CreateAula(turmaEncontrada);

            AulaRepository.Add(aula);

            Uow.Commit();

            var aulas = AulaRepository.GetAll();

            Assert.AreEqual(2, aulas.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Aula_ORM_Test()
        {
            var aulaEncontrada = AulaRepository.GetById(1);

            Assert.IsNotNull(aulaEncontrada);
            Assert.AreEqual(1, aulaEncontrada.Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Aula_ORM_Test()
        {
            var aulaEncontrada = AulaRepository.GetById(1);
            aulaEncontrada.Data = DateTime.Now.AddYears(-15);

            AulaRepository.Update(aulaEncontrada);

            Uow.Commit();

            var aulaEditada = AulaRepository.GetById(1);

            Assert.AreEqual(2000, aulaEditada.Data.Year);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todas_Aulas_ORM_Test()
        {
            var aulasEncontradas = AulaRepository.GetAll();

            Assert.IsNotNull(aulasEncontradas);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Remover_Aula_ORM_Test()
        {
            AulaRepository.Add(new Aula());

            Uow.Commit();

            var aulasEncontradas = AulaRepository.GetAll();

            Assert.IsTrue(aulasEncontradas.Count == 2);

            AulaRepository.Delete(1);

            Uow.Commit();

            aulasEncontradas = AulaRepository.GetAll();

            Assert.IsTrue(aulasEncontradas.Count == 1);
        }
    }
}