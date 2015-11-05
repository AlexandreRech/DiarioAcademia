using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.UnitTests.Base;
using System;

namespace NDDigital.DiarioAcademia.UnitTests.Servicos
{
    [TestClass]
    public class AulaMapperTest : BaseTest
    {
        private const string TestCategory =
            "Mapeamento - Aula";

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Aula_To_AulaDTO_Mapper_Test()
        {
            var aula = ObjectBuilder.CreateAula();

            var dto = Mapper.Map<AulaDTO>(aula);

            Assert.AreEqual(dto.Id, aula.Id);
            Assert.AreEqual(dto.TurmaId, aula.Turma.Id);
            Assert.AreEqual(dto.DataAula, aula.Data);
        }

        [TestMethod]
        [TestCategory(TestCategory)]
        public void AulaDTO_To_Aula_Mapper_Test()
        {
            var dto = new AulaDTO
            {
                Id = 2,
                AnoTurma = 2014,
                DataAula = DateTime.Now.AddYears(-1),
                TurmaId = 5
            };

            var aula = Mapper.Map<Aula>(dto);

            Assert.AreEqual(dto.Id, aula.Id);
            Assert.AreEqual(dto.DataAula, aula.Data);
        }
    }
}