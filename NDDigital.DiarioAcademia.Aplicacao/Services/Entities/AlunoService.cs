using AutoMapper;
using iTextSharp.text;
using iTextSharp.text.pdf;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.CepServices;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace NDDigital.DiarioAcademia.Aplicacao.Services
{
    public interface IAlunoService : IService<AlunoDTO>
    {
        IList<AlunoDTO> GetAllByTurmaId(int id);

        Endereco BuscaEnderecoPorCep(string cep);

        void GerarRelatorioAlunosPdf(int ano, string path);

        IQueryable<Aluno> GetAlunos();
    }



    public class AlunoService : IAlunoService
    {
        private IAlunoRepository _alunoRepository;
        private IUnitOfWork _unitOfWork;
        private ITurmaRepository _turmaRepository;
        private CepWebService _webService;

        public AlunoService(IAlunoRepository repoAluno, ITurmaRepository repoTurma, IUnitOfWork unitOfWork)
        {

            _alunoRepository = repoAluno;
            _turmaRepository = repoTurma;
            _unitOfWork = unitOfWork;
        }

        public void Add(AlunoDTO alunoDto)
        {
            Turma turma = _turmaRepository.GetById(alunoDto.TurmaId);

            Aluno aluno = new Aluno(alunoDto.Descricao.Split(':')[0], turma ?? new Turma(2007));

            aluno.Endereco.Bairro = alunoDto.Bairro;
            aluno.Endereco.Cep = alunoDto.Cep;
            aluno.Endereco.Localidade = alunoDto.Localidade;
            aluno.Endereco.Uf = alunoDto.Uf;

            _alunoRepository.Add(aluno);

            _unitOfWork.Commit();
        }

        public void Update(AlunoDTO alunoDto)
        {
            Turma turma = _turmaRepository.GetById(alunoDto.TurmaId);

            Aluno aluno = _alunoRepository.GetById(alunoDto.Id);

            aluno.Nome = alunoDto.Descricao.Split(':')[0];
            aluno.Turma = turma;
            aluno.Endereco.Bairro = alunoDto.Bairro;
            aluno.Endereco.Cep = alunoDto.Cep;
            aluno.Endereco.Localidade = alunoDto.Localidade;
            aluno.Endereco.Uf = alunoDto.Uf;

            _alunoRepository.Update(aluno);

            _unitOfWork.Commit();
        }

        public void Delete(int id)
        {
            _alunoRepository.Delete(id);

            _unitOfWork.Commit();
        }

        public AlunoDTO GetById(int id)
        {
            var aluno = _alunoRepository.GetById(id);

            return Mapper.Map<AlunoDTO>(aluno);
        }

        public IList<AlunoDTO> GetAll()
        {
            return _alunoRepository.GetAll()
                .Select(aluno => Mapper.Map<AlunoDTO>(aluno))
                .ToList();
        }

        public IList<AlunoDTO> GetAllByTurmaId(int id)
        {
            return _alunoRepository.GetAll()
              .Select(aluno => Mapper.Map<AlunoDTO>(aluno))
              .Where(aluno => aluno.TurmaId == id)
              .ToList();
        }

        public Endereco BuscaEnderecoPorCep(string cep)
        {
            _webService = new CepWebService();

            return _webService.PreencheEndereco(cep);
        }

        public void GerarRelatorioAlunosPdf(int id, string path)
        {
            try
            {
                var list = GetAllByTurmaId(id);

                FileStream fs = new FileStream(path,
                           FileMode.Create, FileAccess.Write, FileShare.None);

                Document doc = new Document();

                PdfWriter writer = PdfWriter.GetInstance(doc, fs);

                doc.Open();

                doc.Add(new Paragraph(Resource.RELATORIO_TITULO + id + ":\n\n"));
                doc.Add(new Paragraph(Resource.RELATORIO_DESCRICAO +":\n\n"));

                foreach (var item in list)
                {
                    doc.Add(new Paragraph(item.Descricao));
                }

                doc.Close();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IQueryable<Aluno> GetAlunos()
        {
            return _alunoRepository.GetAlunos();                 
        }
    }
}