using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Linq;

namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class PermissionRepositoryTest : BaseSecurityTest
    {
        private const string TestCategory =
            "Authorization - Permission";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Uma_Permissao()
        {
            PermissionRepository.Add(ObjectBuilder.CreatePermission());
            Uow.Commit();

            var list = PermissionRepository.GetAll();

            Assert.AreEqual(5, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Uma_Permissao()
        {
            var permissao = PermissionRepository.GetById(1);

            PermissionRepository.Delete(permissao);

            Uow.Commit();

            var list = PermissionRepository.GetAll();

            Assert.AreEqual(3, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Atualizar_Uma_Permissao()
        {
            var permissao = PermissionRepository.GetById(1);
            permissao.PermissionId = "02";

            PermissionRepository.Update(permissao);

            Uow.Commit();

            var permissaoEditada = PermissionRepository.GetById(1);

            Assert.AreEqual("02", permissaoEditada.PermissionId);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Todas_Permissoes()
        {
            var list = PermissionRepository.GetAll();

            Assert.IsNotNull(list);
            Assert.AreEqual(4, list.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Permissoes_Por_Grupo()
        {
            var administrador = GroupRepository.GetById(1);

            var permissao = ObjectBuilder.CreatePermission();

            administrador.Permissions.Add(permissao);

            Uow.Commit();

            var adminPermissions = PermissionRepository.GetByGroup(administrador.Id);

            Assert.AreEqual(3, adminPermissions.Count);

            var allPermissions = PermissionRepository.GetAll();

            Assert.AreEqual(5, allPermissions.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Buscar_Permissoes_Por_Usuario()
        {
            var acc = AccountRepository.GetAll().First();

            var list = PermissionRepository.GetByUser(acc.Username);

            Assert.AreEqual(4, list.Count);
        }
    }
}