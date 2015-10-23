using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    /// <summary>
    /// Summary description for BaseTest
    /// </summary>
    public class BaseTest
    {
        #region Protected Properties

        protected IUnitOfWork Uow;

        #endregion Protected Properties

        [TestInitialize]
        public virtual void Initialize()
        {
            ObjectBuilder.Reset();
        }
    }
}