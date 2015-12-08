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
    }

    public class ClaimService : IClaimService
    {
        private IPermissionRepository _permissionRepository;
        private IClaimRepository _claimRepository;

        private IUnitOfWork _unitOfWork;

        public ClaimService(
            IPermissionRepository permissionRepository,
            IClaimRepository claimRepository,
            IUnitOfWork uow)
        {
            _permissionRepository = permissionRepository;
            _claimRepository = claimRepository;
            _unitOfWork = uow;
        }


        public void Add(ClaimDTO obj)
        {
            var permissions = _permissionRepository.GetAllSpecific(obj.Permissions);
            Claim auth = new Claim(obj.Name, permissions);
            _claimRepository.Add(auth);
            _unitOfWork.Commit();
        }

        public void Update(ClaimDTO obj)
        {
            var permissions = _permissionRepository.GetAllSpecific(obj.Permissions);
            var auth = _claimRepository.GetByName(obj.Name);
            auth.Permissions = permissions;
            _claimRepository.Update(auth);
            _unitOfWork.Commit();
        }

        public void Delete(int id)
        {
            var autho = _claimRepository.GetById(id);
            if (autho == null)
                return;
            var permissions = autho.Permissions.Select(p => p.PermissionId).ToArray();
            _claimRepository.Delete(id);
            _unitOfWork.Commit();
            _permissionRepository.checkPermissions(permissions);

            _unitOfWork.Commit();
        }

        public IList<ClaimDTO> GetAll()
        {
            return _claimRepository.GetAll()
                .Select(authorization => Mapper.Map<ClaimDTO>(authorization))
                .ToList();
        }

        public ClaimDTO GetById(int id)
        {
            var authorization = _claimRepository.GetById(id);

            return Mapper.Map<ClaimDTO>(authorization);

        }
        public List<ClaimDTO> GetByUser(string username)
        {
            var authorizations = _claimRepository.GetByUser(username);
            var authorizationsDTO = new List<ClaimDTO>();
            authorizations.ForEach((autho) =>
            {
                authorizationsDTO.Add(Mapper.Map<ClaimDTO>(autho));
            });

            return authorizationsDTO;
        }

    }
}