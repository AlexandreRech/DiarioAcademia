using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Dominio.Exceptions;
using NDDigital.DiarioAcademia.UnitTests.Base;
using System;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class PresencaServiceTests: BaseServiceTest
    {
        private const string TestCategory =
      "Teste de Serviço - Presenças";


        [TestMethod]
        [TestCategory(TestCategory)]
        public void RegistraPresenca_deveria_persistir_as_presencas_dos_alunos()
        {
            //arrange
            int qtdAlunos = 5;

            var alunos = ObjectBuilder.CriaListaAlunos(qtdAlunos);

            var ids = new List<int>();

            foreach (var item in alunos)
            {
                ids.Add(item.Id);
            }

            var comando = ObjectBuilder.CriaRegistraPresencaCommand(ids);

            AlunoRepository
                .Setup(x => x.GetAllByTurmaId(It.IsAny<int>()))
                .Returns(alunos);

            AulaRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(new Aula(DateTime.Now, new Turma(2014)));

            //act
            AulaService.RealizaChamada(comando);

            //assert
            AlunoRepository.Verify(x => x.Update(It.IsAny<Aluno>()), Times.Exactly(5));

            UnitOfWork.Verify(x => x.Commit(), Times.Once());
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        [ExpectedException(typeof(AlunoNaoEncontrado))]
        public void RegistraPresenca_deveria_lancar_excecao_AlunoNaoEncontrado()
        {
            //arrange
            AlunoRepository
                .Setup(x => x.GetAllByTurmaId(It.IsAny<int>()))
                .Returns(null as List<Aluno>);

            var comando = new ChamadaDTO { AnoTurma = 2000 };

            // act
            AulaService.RealizaChamada(comando);

            // assert is [ExpectedException]
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        [ExpectedException(typeof(AulaNaoEncontrada))]
        public void RegistraPresenca_deveria_lancar_excecao_AulaNaoEncontrado()
        {
            //arrange
            int qtdAlunos = 1;

            var alunos = ObjectBuilder.CriaListaAlunos(qtdAlunos);

            AlunoRepository
                .Setup(x => x.GetAllByTurmaId(It.IsAny<int>()))
                .Returns(alunos);

            AulaRepository
                .Setup(x => x.GetById(It.IsAny<int>()))
                .Returns(null as Aula);

            var comando = new ChamadaDTO { AnoTurma = 2000 };

            //act

            AulaService.RealizaChamada(comando);
            // assert is [ExpectedException]
        }
    }
}