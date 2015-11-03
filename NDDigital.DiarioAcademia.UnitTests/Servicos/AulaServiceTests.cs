using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.UnitTests.Base;
using System;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class AulaServiceTest: BaseServiceTest
    {
        private const string TestCategory =
            "Teste de Serviço - Aula";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Persistir_Aula_Test()
        {
            //arrange
            var aula = ObjectBuilder.CreateAula();

            aula.Turma = ObjectBuilder.CreateTurma();

            AulaRepository
                .Setup(x => x.Add(It.IsAny<Aula>()));

            UnitOfWork.Setup(x => x.Commit());

            //act
            AulaService.Add(new AulaDTO(aula));

            //assert
            AulaRepository.Verify(x => x.Add(It.IsAny<Aula>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Aula_Test()
        {
            //arrange
            AulaRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(ObjectBuilder.CreateAula());

            //act
            AulaService.GetById(1);

            //assert
            AulaRepository.Verify(x => x.GetById(It.IsAny<int>()), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Editar_Aula_Test()
        {
            //arrange
            var aula = ObjectBuilder.CreateAula();

            aula.Data = DateTime.Now;

            AulaRepository
                .Setup(x => x.Update(aula));

            AulaRepository
             .Setup(x => x.GetById(It.IsAny<int>()))
             .Returns(aula);

            UnitOfWork.Setup(x => x.Commit());

            //act
            AulaService.Update(new AulaDTO(aula));

            //assert
            AulaRepository.Verify(x => x.Update(aula), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Todas_Aulas_Test()
        {
            //arrange
            var aulas = new List<Aula>() { ObjectBuilder.CreateAula() };

            AulaRepository
                .Setup(x => x.GetAll())
                .Returns(aulas);

            //act
            AulaService.GetAll();

            //assert
            AulaRepository.Verify(x => x.GetAll(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Remover_Aula_Test()
        {
            //arrange
            AulaRepository
                .Setup(x => x.Delete(It.IsAny<int>()));

            //act
            AulaService.Delete(1);

            UnitOfWork.Setup(x => x.Commit());

            //assert
            AulaRepository.Verify(x => x.Delete(It.IsAny<int>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }
    }
}