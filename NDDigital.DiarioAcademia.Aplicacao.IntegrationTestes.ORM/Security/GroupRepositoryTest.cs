using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Linq;

namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class GroupRepositoryTest : BaseSecurityTest
    {
        private const string TestCategory =
            "Authorization - Group";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Um_Grupo()
        {
            GroupRepository.Add(ObjectBuilder.CreateGroup());

            Uow.Commit();

            var list = GroupRepository.GetAll();

            Assert.AreEqual(3, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Um_Grupo()
        {
            var group = GroupRepository.GetById(1);

            GroupRepository.Delete(group);

            Uow.Commit();

            var list = GroupRepository.GetAll();

            Assert.AreEqual(1, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todos_Grupos()
        {
            var list = GroupRepository.GetAll();

            Assert.AreEqual(2, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Grupos_Por_Usuario()
        {
            var acc = AccountRepository.GetAll().First();

            var list = GroupRepository.GetByUser(acc.Username);

            Assert.AreEqual(2, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Verifica_se_usuario_é_administrador()
        {
            var acc = AccountRepository.GetAll().First();

            Assert.IsTrue(GroupRepository.IsAdmin(acc.Username));
        }
    }
}