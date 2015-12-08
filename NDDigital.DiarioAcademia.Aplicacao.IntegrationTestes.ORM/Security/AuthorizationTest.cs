using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Linq;
using System.Data.Entity;
using System.Collections.Generic;


namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class AuthorizationTest : BaseSecurityTest
    {
        private const string TestCategory =
            "Authorization - Relations";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Adicionar_Autorizacao_ao_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Claims);

            var claims = ObjectBuilder.CreateListClaim();
            var claimsDTO = new List<ClaimDTO>();
            claims.ForEach((autho) =>
            {
                ClaimRepository.Add(autho);
                claimsDTO.Add(new ClaimDTO(autho));
            });
            Uow.Commit();
            AuthorizationService.AddAuthorizationToGroup(grupo.Id, claimsDTO.ToArray());

            //Test authorization in group
            var authorize = ClaimRepository.GetByGroup(2);
            grupo = GroupRepository.GetByIdIncluding(2, g => g.Claims);

            Assert.IsNotNull(authorize);
            Assert.AreEqual(4, grupo.Claims.Count);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Excluir_Autorizacao_do_Grupo()
        {
            var grupo = GroupRepository.GetByIdIncluding(2, g => g.Claims);

            var authoExclude = grupo.Claims.Last();

            var authorizationsDTO = new List<ClaimDTO>()
            {
                new ClaimDTO(grupo.Claims.Last())
            };
            AuthorizationService.RemoveAuthorizationFromGroup(grupo.Id, authorizationsDTO.ToArray());
            Uow.Commit();

            var authorizationGroups = ClaimRepository.GetByGroup(grupo.Id);
            grupo = GroupRepository.GetByIdIncluding(2, g => g.Claims);

            Assert.AreEqual(1, grupo.Claims.Count);
            Assert.IsFalse(authorizationGroups.Contains(authoExclude));
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
            var acc = ObjectBuilder.CreateAccount();
            acc.Groups = acc.Groups.Where(g => !g.IsAdmin).ToList();
            if (acc.Groups.Any()) {
                var group = ObjectBuilder.CreateGroup();
                group.IsAdmin = false;
                acc.Groups.Add(group);            
            }
            var permission = ObjectBuilder.CreatePermission();
            acc.Groups.Last().Claims.Last().Permissions.Add(permission);
            AccountRepository.Add(acc);
            Uow.Commit();

            Assert.IsTrue(AuthorizationService.IsAuthorized(acc.Username, permission.PermissionId));
        }
    }
}