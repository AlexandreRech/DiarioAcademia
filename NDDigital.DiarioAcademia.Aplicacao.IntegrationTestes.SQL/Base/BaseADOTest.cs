using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class BaseADOTest : BaseTest
    {
        protected IAlunoRepository AlunoRepository;
        protected ITurmaRepository TurmaRepository;
        protected IAulaRepository AulaRepository;
        protected IPresencaRepository PresencaRepository;

        protected AdoNetFactory Factory;

        [TestInitialize]
        public override void Initialize()
        {
            base.Initialize();

            Factory = new AdoNetFactory();

            Uow = new ADOUnitOfWork(Factory);

            new DatabaseTestInitializer(Uow, Factory);

            AlunoRepository = new AlunoRepositorySql(Factory);
            TurmaRepository = new TurmaRepositorySql(Factory);
            AulaRepository = new AulaRepositorySql(Factory);
            PresencaRepository = new PresencaRepositorySql(Factory);

        }
    }
}