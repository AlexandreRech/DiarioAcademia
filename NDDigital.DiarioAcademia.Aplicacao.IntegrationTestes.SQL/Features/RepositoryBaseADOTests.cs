using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using System.Data;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories;
using NDDigital.DiarioAcademia.IntegrationTests.Base;

namespace NDDigital.DiarioAcademia.IntegrationTests.ADO
{
    [TestClass]
    public class RepositoryBaseADOTests
    {
        private const string Category = "Testes de Conexão com o Banco";

        [TestMethod]
        [TestCategory(Category)]
        public void Abrir_Conexao_Test()
        {
            var factory = new AdoNetFactory();

            Assert.IsTrue(factory.Connection.State == ConnectionState.Open); 
        }


        [TestMethod]
        [TestCategory(Category)]
        public void Transaction_Test()
        {
            var factory = new AdoNetFactory();

            var uow = new ADOUnitOfWork(factory);

            var turmaRepository = new TurmaRepositorySql(factory);
        }
    }
}
