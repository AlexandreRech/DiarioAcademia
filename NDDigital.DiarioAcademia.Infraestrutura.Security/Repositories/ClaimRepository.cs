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
    public class ClaimRepository : RepositoryBaseAuth<Claim>, IClaimRepository
    {
        private IUnitOfWork uow;

        public ClaimRepository(AuthFactory dbFactory)
            : base(dbFactory)
        {
        }

        public override Claim GetById(int id)
        {
            return dataContext.Claims.Include(a => a.Permissions).Where(g => g.Id == id).FirstOrDefault();
        }


        public List<Claim> GetByGroup(int groupId)
        {
            var list = new List<Claim>();
            Group group = dataContext.Groups.Include(g => g.Claims).Where(g => g.Id == groupId).FirstOrDefault();
            if (group == null)
                return list;
            return group.Claims;
        }

        public List<Claim> GetByUser(string username)
        {
            var list = new List<Claim>();
            Account acc = dataContext.Accounts.Include(a => a.Groups).Where(a => a.Username == username).FirstOrDefault();
            if (acc == null)
                return list;    
            acc.Groups.ForEach((group) => {
                list.AddRange(group.Claims);
                list = list.Distinct().ToList();
            });
            return list;
        }

        public List<Claim> GetAllSpecific(string[] claims)
        {
            var list = new List<Claim>();
            foreach (var name in claims)
            {
                var claim = GetByName(name);

                list.Add(claim ?? new Claim(name));
            }
            list.RemoveAll(x => x == null);
            return list;
        }


        public Claim GetByName(string name)
        {
            return dataContext.Claims.Include(a => a.Permissions).Where(a => a.Name == name).FirstOrDefault();
        }

        public List<Claim> GetByPermissionId(string permissionId)
        {
            return dataContext.Claims.Include(a => a.Permissions)
                .Where(a => a.Permissions.Where(p => p.PermissionId == permissionId).ToList().Count > 0).ToList();

        }
    }
}
