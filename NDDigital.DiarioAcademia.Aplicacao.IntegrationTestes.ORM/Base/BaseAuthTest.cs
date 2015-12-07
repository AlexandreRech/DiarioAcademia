using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Common;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.IntegrationTests.Common;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    /// <summary>
    /// Summary description for BaseTest
    /// </summary>
    public class BaseAuthTest : BaseTest
    {
        #region Constructor Utilities

        protected DatabaseAuthFixture Fixture;
        protected AuthFactory Factory;

        // protected IdentityUserStore IdentityUserStore;
        protected UserStore<User> IdentityUserStore;

        protected IClaimService AuthorizationService;

        #endregion Constructor Utilities

        [TestInitialize]
        public override void Initialize()
        {
            base.Initialize();

            Fixture = new DatabaseAuthFixture();

            Factory = Fixture.Factory;

            var context = Factory.Get();

            IdentityUserStore = new UserStore<User>();

            Uow = new AuthUnitOfWork(Factory);

            Database.SetInitializer(new DatabaseTestInitializer());

        }
    }
}