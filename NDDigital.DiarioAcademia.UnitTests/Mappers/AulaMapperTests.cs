using AutoMapper;
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
    public class AulaMapperTest: BaseTest
    {
        private const string TestCategory =
            "Mapeamento - Aula";

       

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Aluno_To_AlunoDTO_Mapper_Test()
        {

            var aula = ObjectBuilder.CreateAula();

            var dto = Mapper.Map<AulaDTO>(aula);

            Assert.AreEqual(dto.Id, aula.Id);
            Assert.AreEqual(dto.TurmaId, aula.Turma.Id);
            Assert.AreEqual(dto.DataAula, aula.Data);
        }


        [TestMethod]
        [TestCategory(TestCategory)]
        public void AlunoDTO_To_Aluno_Mapper_Test()
        {
            Assert.Inconclusive();
        }
    }
}