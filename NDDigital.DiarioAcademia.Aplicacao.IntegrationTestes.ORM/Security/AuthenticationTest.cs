using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Linq;
using System.Data.Entity;
using System.Collections.Generic;


namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class AuthenticationTest : BaseSecurityTest
    {
        private const string TestCategory =
            "Authorizarion - Relations";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Autorizacao_ao_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Authorizations);

            var authorizations = ObjectBuilder.CreateListAuthorizations();
            var authorizationsDTO = new List<ClaimDTO>();
            authorizations.ForEach((autho) =>
            {
                authorizationsDTO.Add(new ClaimDTO(autho));
            });

            AuthorizationService.AddAuthorizationToGroup(grupo.Id, authorizationsDTO.ToArray());

            //Test authorization in group
            var authorize = AuthorizationRepository.GetByGroup(2);
            grupo = GroupRepository.GetByIdIncluding(2, g => g.Authorizations);

            Assert.IsNotNull(authorize);
            Assert.AreEqual(1, grupo.Authorizations.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Autorizacao_do_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Authorizations);

            var id = grupo.Authorizations.First().Permissions.First().PermissionId;

            var authorizationsDTO = new List<ClaimDTO>()
            {
                new ClaimDTO(grupo.Authorizations.First())
            };

            AuthorizationService.RemoveAuthorizationFromGroup(grupo.Id, authorizationsDTO.ToArray());

            var permission = PermissionRepository.GetByPermissionId(id);
            grupo = GroupRepository.GetByIdIncluding(2, g => g.Authorizations);
            var permissionsGroup = PermissionRepository.GetByGroup(grupo.Id);

            Assert.IsNull(permission);
            Assert.AreEqual(0, grupo.Authorizations.Count);
            Assert.IsFalse(permissionsGroup.Contains(permission));
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

            var group = GroupRepository.GetByIdIncluding(acc.Groups[0].Id, x => x.Authorizations);

            var permissionId = group.Authorizations.First().Permissions.First().PermissionId;

            Assert.IsTrue(AuthorizationService.IsAuthorized(acc.Username, permissionId));
        }
    }
}