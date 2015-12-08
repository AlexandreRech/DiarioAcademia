using Infrastructure.DAO.ORM.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Orm.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using NDDigital.DiarioAcademia.IntegrationTests.Common;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    /// <summary>
    /// Summary description for BaseTest
    /// </summary>
    public class BaseEntityFrameworkTest : BaseTest
    {
        #region Constructor Utilities

        protected DatabaseEntityFrameworkFixture Fixture;
        protected EntityFrameworkFactory Factory;
        protected IdentityUserStore IdentityUserStore;

        protected IClaimService AuthorizationService;

        #endregion Constructor Utilities

        [TestInitialize]
        public override void Initialize()
        {
            base.Initialize();

            Fixture = new DatabaseEntityFrameworkFixture();

            Factory = Fixture.Factory;

            var context = Factory.Get();

            Uow = new EntityFrameworkUnitOfWork(Factory);

            Database.SetInitializer(new DatabaseTestInitializer());

        }
    }
}