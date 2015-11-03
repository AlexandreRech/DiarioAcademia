using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Profiles;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class TurmaServiceTest
    {
        private readonly Mock<ITurmaRepository> _turmaRepository = null;
        private readonly Mock<IUnitOfWork> _unitOfWork = null;
        private ITurmaService _turmaService;

        private const string TestCategory =
            "Teste de Serviço - Turma";

        public TurmaServiceTest()
        {
            AutoMapperConfig.ConfigMappers();

            _unitOfWork = new Mock<IUnitOfWork>();

            _turmaRepository = new Mock<ITurmaRepository>();

            _turmaService = new TurmaService(_turmaRepository.Object, _unitOfWork.Object);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Persistir_Turma_Service_Test()
        {
            var repo = Injection.Get<ITurmaRepository>();
            var uow = Injection.Get<IUnitOfWork>();
            var service = new TurmaService(repo, uow);

            service.Add(new TurmaDTO(ObjectBuilder.CreateTurma()));

            var turmas = service.GetAll();

            Assert.IsTrue(turmas.Count > 1);
            Assert.IsTrue((uow as Infrastructure.DAO.ORM.Common.EntityFrameworkUnitOfWork).Test() == (repo as NDDigital.DiarioAcademia.Infraestrutura.Orm.Repositories.TurmaRepositoryEF).Test());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Persistir_Turma_Test()
        {
            //arrange
            var turma = ObjectBuilder.CreateTurma();

            _turmaRepository
                .Setup(x => x.Add(It.IsAny<Turma>()));

            _unitOfWork.Setup(x => x.Commit());

            //act
            _turmaService.Add(new TurmaDTO(turma));

            //assert
            _turmaRepository.Verify(x => x.Add(It.IsAny<Turma>()), Times.Once());

            _unitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Turma_Test()
        {
            //arrange
            _turmaRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(ObjectBuilder.CreateTurma());

            //act
            _turmaService.GetById(1);

            //assert
            _turmaRepository.Verify(x => x.GetById(It.IsAny<int>()), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Editar_Turma_Test()
        {
            //arrange
            var turma = ObjectBuilder.CreateTurma();

            turma.Ano = 2016;

            _turmaRepository
                .Setup(x => x.Update(turma));

            _turmaRepository
             .Setup(x => x.GetById(It.IsAny<int>()))
             .Returns(turma);

            _unitOfWork.Setup(x => x.Commit());

            //act
            _turmaService.Update(new TurmaDTO(turma));

            //assert
            _turmaRepository.Verify(x => x.Update(turma), Times.Once());

            _unitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Todas_Turmas_Test()
        {
            //arrange
            var turmas = new List<Turma>() { ObjectBuilder.CreateTurma() };

            _turmaRepository
                .Setup(x => x.GetAll())
                .Returns(turmas);

            //act
            _turmaService.GetAll();

            //assert
            _turmaRepository.Verify(x => x.GetAll(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Remover_Turma_Test()
        {
            //arrange
            _turmaRepository
                .Setup(x => x.Delete(It.IsAny<int>()));

            //act
            _turmaService.Delete(1);

            _unitOfWork.Setup(x => x.Commit());

            //assert
            _turmaRepository.Verify(x => x.Delete(It.IsAny<int>()), Times.Once());

            _unitOfWork.Verify(x => x.Commit(), Times.Once());
        }
    }
}