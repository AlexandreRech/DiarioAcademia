using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using Moq;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Aplicacao.Profiles;

namespace NDDigital.DiarioAcademia.UnitTests.Base
{
    [TestClass]
    public class BaseTest
    {
        public BaseTest()
        {
            AutoMapperConfig.ConfigMappers();
        }

    }
}
