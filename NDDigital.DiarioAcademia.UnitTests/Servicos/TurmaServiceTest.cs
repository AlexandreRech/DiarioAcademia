using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Profiles;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using NDDigital.DiarioAcademia.UnitTests.Base;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class TurmaServiceTest : BaseServiceTest
    {

        private const string TestCategory =
            "Teste de Serviço - Turma";

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

            TurmaRepository
                .Setup(x => x.Add(It.IsAny<Turma>()));

            UnitOfWork.Setup(x => x.Commit());

            //act
            TurmaService.Add(new TurmaDTO(turma));

            //assert
            TurmaRepository.Verify(x => x.Add(It.IsAny<Turma>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Turma_Test()
        {
            //arrange
            TurmaRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(ObjectBuilder.CreateTurma());

            //act
            TurmaService.GetById(1);

            //assert
            TurmaRepository.Verify(x => x.GetById(It.IsAny<int>()), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Editar_Turma_Test()
        {
            //arrange
            var turma = ObjectBuilder.CreateTurma();

            turma.Ano = 2016;

            TurmaRepository
                .Setup(x => x.Update(turma));

            TurmaRepository
             .Setup(x => x.GetById(It.IsAny<int>()))
             .Returns(turma);

            UnitOfWork.Setup(x => x.Commit());

            //act
            TurmaService.Update(new TurmaDTO(turma));

            //assert
            TurmaRepository.Verify(x => x.Update(turma), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Todas_Turmas_Test()
        {
            //arrange
            var turmas = new List<Turma>() { ObjectBuilder.CreateTurma() };

            TurmaRepository
                .Setup(x => x.GetAll())
                .Returns(turmas);

            //act
            TurmaService.GetAll();

            //assert
            TurmaRepository.Verify(x => x.GetAll(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Remover_Turma_Test()
        {
            //arrange
            TurmaRepository
                .Setup(x => x.Delete(It.IsAny<int>()));

            //act
            TurmaService.Delete(1);

            UnitOfWork.Setup(x => x.Commit());

            //assert
            TurmaRepository.Verify(x => x.Delete(It.IsAny<int>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }
    }
}