using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Aplicacao.Services.Security
{
    public interface IAuthorizationService {

        void AddAuthorizationToGroup(int groupId, ClaimDTO[] authorizations);

        void RemoveAuthorizationFromGroup(int groupId, ClaimDTO[] authorizations);

        void AddGroupToUser(string username, int[] groups);

        void RemoveGroupFromUser(string username, int[] groups);

        bool IsAuthorized(string username, string permissionId);

        bool IsAuthorized(string username, string[] permissionId);

    }

    public class AuthorizationService : IAuthorizationService
    {
         private IPermissionRepository _permissionRepository;
        private IGroupRepository _groupRepository;
        private IAccountRepository _accountRepository;
        private IClaimRepository _claimRepository;

        private IUnitOfWork _unitOfWork;

        public AuthorizationService(
            IGroupRepository groupRepository,
            IPermissionRepository permissionRepository,
            IAccountRepository accountRepository,
            IClaimRepository claimRepository,
            IUnitOfWork uow)
        {
            _permissionRepository = permissionRepository;
            _groupRepository = groupRepository;
            _claimRepository = claimRepository;
            _unitOfWork = uow;
            _accountRepository = accountRepository;
        }

        public void AddAuthorizationToGroup(int groupId, ClaimDTO[] authorizations)
        {
            var groupEncontrado = _groupRepository.GetByIdIncluding(groupId, x => x.Claims);
            List<Claim> authosAdd = new List<Claim>();
            Claim authorization;
            if (groupEncontrado != null)
            {
                foreach (var autho in authorizations)
                {
                    authorization = _claimRepository.GetByName(autho.Name);
                    if (authorization == null)
                        continue;
                    if (!groupEncontrado.Claims.Contains(authorization))
                        groupEncontrado.Claims.Add(authorization);
                }
            }
            _groupRepository.Update(groupEncontrado);

            _unitOfWork.Commit();
        }

        public void RemoveAuthorizationFromGroup(int groupId, ClaimDTO[] authorizations)
        {
            var groupEncontrado = _groupRepository.GetByIdIncluding(groupId, x => x.Claims);
            foreach (var autho in authorizations)
            {
                for (int i = 0; i < authorizations.Length; i++)
                {

                    var auth = groupEncontrado.Claims.FirstOrDefault(a => a.Name == authorizations[i].Name);
                    if (auth != null)
                    {
                        groupEncontrado.Claims.Remove(auth);
                    };
                }

            }
            _groupRepository.Update(groupEncontrado);

            _unitOfWork.Commit();
        }


        public void AddGroupToUser(string username, int[] groups)
        {
            var userEncontrado = _accountRepository.GetByUserName(username);

            var listGroups = _groupRepository.GetAllSpecifically(groups);

            SetGroups(userEncontrado, listGroups);

            _accountRepository.Update(userEncontrado);

            _unitOfWork.Commit();
        }

        public void RemoveGroupFromUser(string username, int[] groups)
        {
            var userEncontrado = _accountRepository.GetByUserName(username);

            foreach (var groupId in groups)
            {
                var group = userEncontrado.Groups.FirstOrDefault(p => p.Id == groupId);
                if (group != null)
                    userEncontrado.Groups.Remove(group);
            }
            _accountRepository.Update(userEncontrado);
            _unitOfWork.Commit();
        }

        private void SetGroups(Account userEncontrado, IList<Group> listGroups)
        {
            if (userEncontrado != null)
            {
                userEncontrado.Groups = userEncontrado.Groups ?? new List<Group>();
                foreach (var item in listGroups)
                    if (!userEncontrado.Groups.Contains(item))
                        userEncontrado.Groups.Add(item);
            }
        }

        public bool IsAuthorized(string username, string permissionId)
        {
            var permissions = _permissionRepository.GetByUser(username);

            if (_groupRepository.IsAdmin(username)) return true; ;

            return permissions.Any(p => p.PermissionId == permissionId);
        }

        public bool IsAuthorized(string username, string[] permissionIds)
        {
            var permissions = _permissionRepository.GetByUser(username);

            var isAuth = _groupRepository.IsAdmin(username);

            foreach (var item in permissionIds)
            {
                if (isAuth) break;
                isAuth = permissions.Any(p => p.PermissionId == item);
            }
            return isAuth;
        }
    }
}
