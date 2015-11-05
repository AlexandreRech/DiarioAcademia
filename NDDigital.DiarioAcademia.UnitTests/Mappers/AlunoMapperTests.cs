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
    public class AlunoMapperTest: BaseTest
    {
        private const string TestCategory =
            "Mapeamento - Aula";

       

        [TestMethod]
        [TestCategory(TestCategory)]
        public void Aluno_To_AlunoDTO_Mapper_Test()
        {

            var aluno = ObjectBuilder.CreateAluno();

            var dto = Mapper.Map<AlunoDTO>(aluno);

            Assert.AreEqual(dto.Id, aluno.Id);
            Assert.AreEqual(dto.Descricao, aluno.ToString());
            Assert.AreEqual(dto.Bairro, aluno.Endereco.Bairro);
            Assert.AreEqual(dto.Cep, aluno.Endereco.Cep);
            Assert.AreEqual(dto.Localidade, aluno.Endereco.Localidade);
            Assert.AreEqual(dto.Uf, aluno.Endereco.Uf);
            Assert.AreEqual(dto.TurmaId, aluno.Turma.Id);
        }


        [TestMethod]
        [TestCategory(TestCategory)]
        public void AlunoDTO_To_Aluno_Mapper_Test()
        {
            var dto = new AlunoDTO
            {
                Id=5,
                                Bairro = "Coravagio",
                Cep = "52345543",
                Descricao = "João da Silva: Presenças: 0, Faltas: 0",
                Localidade = "Lages",
                TurmaId = 2,
                Uf = "SC"
                
            };


            var aluno = Mapper.Map<Aluno>(dto);

            Assert.AreEqual(dto.Id, aluno.Id);
            Assert.AreEqual("João da Silva", aluno.Nome);
            Assert.AreEqual(dto.Bairro, aluno.Endereco.Bairro);
            Assert.AreEqual(dto.Cep, aluno.Endereco.Cep);
            Assert.AreEqual(dto.Localidade, aluno.Endereco.Localidade);
            Assert.AreEqual(dto.Uf, aluno.Endereco.Uf);
        }
    }
}