using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Collections.Generic;
using System.Linq;

namespace NDDigital.DiarioAcademia.Aplicacao.Services
{
    public interface IClaimService : IService<ClaimDTO>
    {
        List<ClaimDTO> GetByUser(string username);

        void AddAuthorizationToGroup(int groupId, ClaimDTO[] authorizations);

        void RemoveAuthorizationFromGroup(int groupId, ClaimDTO[] authorizations);

        void AddGroupToUser(string username, int[] groups);

        void RemoveGroupFromUser(string username, int[] groups);

        bool IsAuthorized(string username, string permissionId);

        bool IsAuthorized(string username, string[] permissionId);

    }

    public class ClaimService : IClaimService
    {
        private IPermissionRepository _permissionRepository;
        private IGroupRepository _groupRepository;
        private IAccountRepository _accountRepository;
        private IAuthorizationRepository _authorizationRepository;

        private IUnitOfWork _unitOfWork;

        public ClaimService(
            IGroupRepository groupRepository,
            IPermissionRepository permissionRepository,
            IAccountRepository accountRepository,
            IAuthorizationRepository authorizationRepository,
            IUnitOfWork uow)
        {
            _permissionRepository = permissionRepository;
            _groupRepository = groupRepository;
            _authorizationRepository = authorizationRepository;
            _unitOfWork = uow;
            _accountRepository = accountRepository;
        }


        public void Add(ClaimDTO obj)
        {
            var permissions = _permissionRepository.GetAllSpecific(obj.Permissions);
            Claim auth = new Claim(obj.Name, permissions);
            _authorizationRepository.Add(auth);
            _unitOfWork.Commit();
        }

        public void Update(ClaimDTO obj)
        {
            var permissions = _permissionRepository.GetAllSpecific(obj.Permissions);
            var auth = _authorizationRepository.GetByName(obj.Name);
            auth.Permissions = permissions;
            _authorizationRepository.Update(auth);
            _unitOfWork.Commit();
        }

        public void Delete(int id)
        {
            var autho = _authorizationRepository.GetById(id);
            if (autho == null)
                return;
            var permissions = autho.Permissions.Select(p => p.PermissionId).ToArray();
            _authorizationRepository.Delete(id);
            _unitOfWork.Commit();
            _permissionRepository.checkPermissions(permissions);

            _unitOfWork.Commit();
        }

        public IList<ClaimDTO> GetAll()
        {
            return _authorizationRepository.GetAll()
                .Select(authorization => Mapper.Map<ClaimDTO>(authorization))
                .ToList();
        }

        public ClaimDTO GetById(int id)
        {
            var authorization = _authorizationRepository.GetById(id);

            return Mapper.Map<ClaimDTO>(authorization);

        }
        public List<ClaimDTO> GetByUser(string username)
        {
            var authorizations = _authorizationRepository.GetByUser(username);
            var authorizationsDTO = new List<ClaimDTO>();
            authorizations.ForEach((autho) =>
            {
                authorizationsDTO.Add(Mapper.Map<ClaimDTO>(autho));
            });

            return authorizationsDTO;
        }

        public void AddAuthorizationToGroup(int groupId, ClaimDTO[] authorizations)
        {
            var groupEncontrado = _groupRepository.GetByIdIncluding(groupId, x => x.Authorizations);
            List<Claim> authosAdd = new List<Claim>();
            Claim authorization;
            IList<Permission> listPermissions;
            if (groupEncontrado != null)
            {
                foreach (var autho in authorizations)
                {
                    authorization = _authorizationRepository.GetByName(autho.Name);
                    if (authorization == null)
                        continue;
                    if (!groupEncontrado.Authorizations.Contains(authorization))
                        groupEncontrado.Authorizations.Add(authorization);
                }
            }
            _groupRepository.Update(groupEncontrado);

            _unitOfWork.Commit();
        }

        public void RemoveAuthorizationFromGroup(int groupId, ClaimDTO[] authorizations)
        {
            var groupEncontrado = _groupRepository.GetByIdIncluding(groupId, x => x.Authorizations);
            foreach (var autho in authorizations)
            {
                for (int i = 0; i < authorizations.Length; i++)
                {

                    var auth = groupEncontrado.Authorizations.FirstOrDefault(a => a.Name == authorizations[i].Name);
                    if (auth != null)
                    {
                        groupEncontrado.Authorizations.Remove(auth);
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