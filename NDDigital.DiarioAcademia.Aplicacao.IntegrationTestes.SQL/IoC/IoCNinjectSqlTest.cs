using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using System.Configuration;

namespace NDDigital.DiarioAcademia.IntegrationTests.IoC
{
    [TestClass]
    public class IoCNinjectSqlTest
    {
        private const string TestCategory =
            "Teste de IoC";

        [TestInitialize]
        public void Initialize()
        {
            const string key = "Infrasctructure.DAO";
            const string dll = "NDDigital.DiarioAcademia.Infraestrutura.SQL.dll";

            ConfigurationManager.AppSettings[key] = dll;
        }


        [TestMethod]
        [TestCategory(TestCategory)]
        public void IoC_Repository_SQL_Test()
        {
            //Através do IoC Ninject busca um implementação do Repositório ADO.NET
            ITurmaRepository repository
                = Injection.Get<ITurmaRepository>();

            Assert.IsInstanceOfType(repository, typeof(TurmaRepositorySql));
        }
    }
}