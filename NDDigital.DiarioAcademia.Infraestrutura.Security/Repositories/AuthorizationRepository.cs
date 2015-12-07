using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories
{
    public class AuthorizationRepository : RepositoryBaseAuth<Claim>, IAuthorizationRepository
    {
        private IUnitOfWork uow;

        public AuthorizationRepository(AuthFactory dbFactory)
            : base(dbFactory)
        {
        }

        public override Claim GetById(int id)
        {
            return dataContext.Authorizations.Include(a => a.Permissions).Where(g => g.Id == id).FirstOrDefault();
        }


        public List<Claim> GetByGroup(int groupId)
        {
            var list = new List<Claim>();
            Group group = dataContext.Groups.Include(g => g.Authorizations).Where(g => g.Id == groupId).FirstOrDefault();
            if (group == null)
                return list;
            return group.Authorizations;
        }

        public List<Claim> GetByUser(string username)
        {
            var list = new List<Claim>();
            Account acc = dataContext.Accounts.Include(a => a.Groups).Where(a => a.Username == username).FirstOrDefault();
            if (acc == null)
                return list;    
            acc.Groups.ForEach((group) => {
                list.AddRange(group.Authorizations);
                list = list.Distinct().ToList();
            });
            return list;
        }

        public List<Claim> GetAllSpecific(string[] authorizations)
        {
            var list = new List<Claim>();
            foreach (var name in authorizations)
            {
                var authorization = GetByName(name);

                list.Add(authorization ?? new Claim(name));
            }
            list.RemoveAll(x => x == null);
            return list;
        }


        public Claim GetByName(string name)
        {
            return dataContext.Authorizations.Include(a => a.Permissions).Where(a => a.Name == name).FirstOrDefault();
        }

        public List<Claim> GetByPermissionId(string permissionId)
        {
            return dataContext.Authorizations.Include(a => a.Permissions)
                .Where(a => a.Permissions.Where(p => p.PermissionId == permissionId).ToList().Count > 0).ToList();

        }
    }
}
