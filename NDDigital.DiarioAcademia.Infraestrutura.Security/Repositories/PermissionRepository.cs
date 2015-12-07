using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories
{
    public class PermissionRepository : RepositoryBaseAuth<Permission>, IPermissionRepository
    {
        public PermissionRepository(AuthFactory dbFactory)
            : base(dbFactory)
        {
        }

        public void DeleteByPermissionId(string permissionId)
        {
            var permission = GetByPermissionId(permissionId);
            if (permission != null)
                Delete(permission.Id);
        }

        public IList<Permission> GetAllSpecific(string[] ids)
        {
            var list = new List<Permission>();
            foreach (var id in ids)
            {
                var permission = GetByPermissionId(id);

                list.Add(permission ?? new Permission(id));
            }
            list.RemoveAll(x => x == null);
            return list;
        }

        public IList<Permission> GetByGroup(int groupId)
        {
            var group = DataContext.Groups
                .Include("Authorization")
                .Where(g => g.Id == groupId)
                .FirstOrDefault();
            var permissions = new List<Permission>();
            if (group == null)
                return permissions;
            foreach (var autho in group.Authorizations)
            {
                foreach (var permission in autho.Permissions)
                {
                    if (!permissions.Contains(permission))
                        permissions.Add(permission);
                }
            }
            //return group?.Permissions;  todo: c# 6
            return permissions;
        }

        public Permission GetByPermissionId(string id)
        {
            return (from p in DataContext.Permissions where p.PermissionId == id select p).FirstOrDefault();
        }

        public IList<Permission> GetByUser(string username)
        {

            Account acc;
            //TODO: rever implementação
            try
            {
                acc = dataContext.Accounts.Include("Groups").Where(a => a.Username == username).FirstOrDefault();

                var list = new List<Permission>();

                foreach (var group in acc.Groups)
                {
                    var listAuthorizarion = DataContext.Groups.Include("Authorizations")
                                        .Where(g => g.Id == group.Id).FirstOrDefault().Authorizations;

                    listAuthorizarion.ForEach((autho) =>
                    {
                        var authorize = DataContext.Authorizations.Include("Permissions").Where(a => a.Id == autho.Id).FirstOrDefault();
                        if (authorize != null)
                        {
                            list.AddRange(autho.Permissions);
                            list = list.Distinct().ToList();
                        }
                    });
                }
                return list;

            }
            catch (Exception ex)
            {
                dataContext = new Contexts.AuthContext();
                return GetByUser(username);
            }
        }

        public void checkPermissions(string[] permissions)
        {
            foreach (var permission in permissions)
            {
                var listAutho = DataContext.Authorizations.Include(a => a.Permissions)
                    .Where(a => a.Permissions.Where(p => p.PermissionId == permission).ToList().Count > 0).ToList();
                if (!listAutho.Any()) {
                    var perm = GetByPermissionId(permission);
                    if (perm != null)
                        Delete(perm.Id);
                }
            }
        }

    }
}
