﻿using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using System.Linq;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories
{
    public class AccountRepository : RepositoryBaseAuth<Account>, IAccountRepository
    {
        private IUnitOfWork uow;

        public AccountRepository(AuthFactory dbFactory)
         : base(dbFactory)
        {
        }

        public Account GetByUserName(string username)
        {
            return (from c in DataContext.Accounts.Include("Groups") where c.Username == username select c).FirstOrDefault();
        }
    }
}