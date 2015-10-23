using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;

namespace NDDigital.DiarioAcademia.IntegrationTests.ADO
{
    [TestClass]
    public class PresencaADOTest : BaseADOTest
    {
        private const string TestCategory =
            "Teste de Integração - Presenças";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Persistir_Presencas_SQL_Test()
        {
            var aluno = AlunoRepository.GetById(1);

            var aula = AulaRepository.GetById(1);

            var presenca = ObjectBuilder.CreatePresenca(aluno, aula, "C");

            PresencaRepository.Add(presenca);

            Uow.Commit();

            var presencas = PresencaRepository.GetAll();

            Assert.AreEqual(2, presencas.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Editar_Presencas_SQL_Test()
        {
            var presencaEncontrada = PresencaRepository.GetById(1);

            Assert.AreEqual("C", presencaEncontrada.StatusPresenca);

            presencaEncontrada.StatusPresenca = "F";

            PresencaRepository.Update(presencaEncontrada);

            Uow.Commit();

            presencaEncontrada = PresencaRepository.GetById(1);

            Assert.AreEqual("F", presencaEncontrada.StatusPresenca);
        }
    }
}