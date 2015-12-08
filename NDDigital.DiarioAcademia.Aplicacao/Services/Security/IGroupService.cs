using NDDigital.DiarioAcademia.Aplicacao.DTOs.Security;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Collections.Generic;
using System.Linq;


namespace NDDigital.DiarioAcademia.Aplicacao.Services
{
    public interface IGroupService : IService<Group>
    {
        IList<Group> GetByUser(string username);

        bool isAdmin(string username);
    }

    public class GroupService : IGroupService
    {
        private IUnitOfWork _uow;
        private IGroupRepository _groupRepository;

        public GroupService(IGroupRepository repo, IUnitOfWork uow)
        {
            _groupRepository = repo;
            _uow = uow;
        }

        public void Add(Group obj)
        {
            _groupRepository.Add(obj);
            _uow.Commit();
        }

        public void Delete(int id)
        {
            _groupRepository.Delete(id);
            _uow.Commit();
        }

        public void Update(Group obj)
        {
            _groupRepository.Update(obj);
            _uow.Commit();
        }

        IList<Group> IService<Group>.GetAll()
        {
            return _groupRepository.GetAllIncluding(g => g.Claims);
        }

        Group IService<Group>.GetById(int id)
        {
            return _groupRepository.GetByIdIncluding(id, g => g.Claims);
        }

        public IList<Group> GetByUser(string username)
        {
            return _groupRepository.GetByUser(username);
        }

        public bool isAdmin(string username)
        {
            return _groupRepository.IsAdmin(username);
        }
    }
}