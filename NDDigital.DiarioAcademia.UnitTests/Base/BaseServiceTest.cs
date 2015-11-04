using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using Moq;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Aplicacao.Services;

namespace NDDigital.DiarioAcademia.UnitTests.Base
{
    [TestClass]
    public class BaseServiceTest
    {
        protected readonly Mock<IAulaRepository> AulaRepository = null;
        protected readonly Mock<IAlunoRepository> AlunoRepository = null;
        protected readonly Mock<ITurmaRepository> TurmaRepository = null;
        protected readonly Mock<IUnitOfWork> UnitOfWork = null;
        protected IAlunoService AlunoService;
        protected ITurmaService TurmaService;
        protected IAulaService AulaService;

        public BaseServiceTest()
        {
            UnitOfWork = new Mock<IUnitOfWork>();

            AlunoRepository = new Mock<IAlunoRepository>();

            AulaRepository = new Mock<IAulaRepository>();
            TurmaRepository = new Mock<ITurmaRepository>();

        }

        [TestInitialize]
        public void initialize()
        {          

            AlunoService = new AlunoService(
                AlunoRepository.Object, 
                TurmaRepository.Object, 
                UnitOfWork.Object
                );

            AulaService = new AulaService(AulaRepository.Object,
                AlunoRepository.Object, TurmaRepository.Object, UnitOfWork.Object);

            TurmaService = new TurmaService(TurmaRepository.Object, UnitOfWork.Object);
        }

    }
}
