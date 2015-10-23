using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Linq;

namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class AuthenticationTest : BaseSecurityTest
    {
        private const string TestCategory =
            "Authorizarion - Relations";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Permissao_ao_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Permissions);

            var permissions = new[] { "9" };

            AuthorizationService.AddPermissionsToGroup(grupo.Id, permissions);

            var permission = PermissionRepository.GetByPermissionId("9");

            Assert.IsNotNull(permission);
            Assert.AreEqual("9", permission.PermissionId);

            Assert.AreEqual(3, grupo.Permissions.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Permissoes_do_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Permissions);

            var id = grupo.Permissions.First().PermissionId;

            var permissions = new[] { id };

            AuthorizationService.RemovePermissionsFromGroup(grupo.Id, permissions);

            var permission = PermissionRepository.GetByPermissionId(id);

            Assert.IsNotNull(permission);

            grupo = GroupRepository.GetByIdIncluding(2, g => g.Permissions);

            Assert.AreEqual(1, grupo.Permissions.Count);
            Assert.IsFalse(grupo.Permissions.Contains(permission));
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Grupo_ao_Usuario()
        {
            var newGroup = ObjectBuilder.CreateGroup(false);

            GroupRepository.Add(newGroup);

            Uow.Commit();

            var account = AccountRepository.GetAllIncluding(a => a.Groups).First(); ;

            AuthorizationService.AddGroupToUser(account.Username, new[] { newGroup.Id });

            var acc = AccountRepository.GetByUserName(account.Username);

            Assert.AreEqual(3, acc.Groups.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Grupo_do_Usuario()
        {
            var user = UserRepository.GetUsers().First();

            AuthorizationService.RemoveGroupFromUser(user.UserName, new[] { 1 });

            var acc = AccountRepository.GetAllIncluding(a => a.Groups).First(); ;
            Assert.AreEqual(1,
                 acc.Groups.Count);

            Assert.AreEqual(2,
                 acc.Groups.First().Id);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Usuario_Deve_Ter_Acesso_a_Permissao()
        {
            var acc = AccountRepository.GetAllIncluding(x => x.Groups).First();

            var group = GroupRepository.GetByIdIncluding(acc.Groups[0].Id, x => x.Permissions);

            var permissionId = group.Permissions.First().PermissionId;

            Assert.IsTrue(AuthorizationService.IsAuthorized(acc.Username, permissionId));
        }
    }
}