using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.UnitTests.Base;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class AlunoServiceTest: BaseServiceTest
    {
       
        private const string TestCategory =
            "Teste de Serviço - Aluno";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Persistir_Aluno_Test()
        {
            //arrange
            var aluno = ObjectBuilder.CreateAluno();

            aluno.Turma = ObjectBuilder.CreateTurma();

            AlunoRepository
                .Setup(x => x.Add(It.IsAny<Aluno>()));

            UnitOfWork.Setup(x => x.Commit());

            //act
            AlunoService.Add(new AlunoDTO(aluno));

            //assert
            AlunoRepository.Verify(x => x.Add(It.IsAny<Aluno>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Aluno_Test()
        {
            //arrange
            AlunoRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(ObjectBuilder.CreateAluno());

            //act
            AlunoService.GetById(1);

            //assert
            AlunoRepository.Verify(x => x.GetById(It.IsAny<int>()), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Editar_Aluno_Test()
        {
            //arrange
            var aluno = ObjectBuilder.CreateAluno();

            aluno.Nome = "Alex Regis";

            AlunoRepository
                .Setup(x => x.Update(aluno));

            AlunoRepository
             .Setup(x => x.GetById(It.IsAny<int>()))
             .Returns(aluno);

            UnitOfWork.Setup(x => x.Commit());

            //act
            AlunoService.Update(new AlunoDTO(aluno));

            //assert
            AlunoRepository.Verify(x => x.Update(aluno), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Buscar_Todas_Alunos_Test()
        {
            //arrange
            var alunos = new List<Aluno>() { ObjectBuilder.CreateAluno() };

            AlunoRepository
                .Setup(x => x.GetAll())
                .Returns(alunos);

            //act
            AlunoService.GetAll();

            //assert
            AlunoRepository.Verify(x => x.GetAll(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Deveria_Chamar_Servico_de_Remover_Aluno_Test()
        {
            //arrange
            AlunoRepository
                .Setup(x => x.Delete(It.IsAny<int>()));

            //act
            AlunoService.Delete(1);

            UnitOfWork.Setup(x => x.Commit());

            //assert
            AlunoRepository.Verify(x => x.Delete(It.IsAny<int>()), Times.Once());

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }
    }
}