using Infrastructure.DAO.ORM.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.Orm.Repositories;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class BaseEFTest : BaseEntityFrameworkTest
    {
        protected IAlunoRepository AlunoRepository;
        protected ITurmaRepository TurmaRepository;
        protected IAulaRepository AulaRepository;

        [TestInitialize]
        public override void Initialize()
        {
            base.Initialize();

            var context = Factory.Get();

            Uow = new EntityFrameworkUnitOfWork(Factory);

            AlunoRepository = new AlunoRepositoryEF(Factory);
            TurmaRepository = new TurmaRepositoryEF(Factory);
            AulaRepository = new AulaRepositoryEF(Factory);
        }
    }
}