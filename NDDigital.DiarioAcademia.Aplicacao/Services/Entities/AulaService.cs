using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Dominio;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Dominio.Exceptions;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NDDigital.DiarioAcademia.Aplicacao.Services
{
    public interface IAulaService : IService<AulaDTO>
    {
        void RealizaChamada(ChamadaDTO registroPresencaDto);

        ChamadaDTO GetChamadaByAula(AulaDTO aula);

        IEnumerable<AulaDTO> GetAllByTurma(int anoTurma);
    }

    public class AulaService : IAulaService
    {
        private IUnitOfWork _unitOfWork;
        private IAulaRepository _aulaRepository;
        private IAlunoRepository _alunoRepository;
        private ITurmaRepository _turmaRepository;

        private readonly string NENHUM_ALUNO_ENCOTRADO_PARA_TURMA = Resource.EXCEPTION_NENHUM_ALUNO_ENCOTRADO_PARA_TURMA;
        private readonly string NENHUMA_AULA_ENCOTRADA_NESTA_DATA = Resource.EXCEPTION_NENHUMA_AULA_ENCOTRADA_NESTA_DATA;

        public AulaService(IAulaRepository repoAula, IAlunoRepository repoAluno, ITurmaRepository repoTurma, IUnitOfWork unitOfWork)
        {

            _aulaRepository = repoAula;
            _alunoRepository = repoAluno;
            _turmaRepository = repoTurma;
            _unitOfWork = unitOfWork;
        }

        public void Add(AulaDTO aulaDto)
        {
            Turma turma = _turmaRepository.GetById(aulaDto.TurmaId);

            Aula aula = new Aula(aulaDto.DataAula, turma);

            _aulaRepository.Add(aula);

            _unitOfWork.Commit();
        }

        public void RealizaChamada(ChamadaDTO registroPresenca)
        {
            var alunos = _alunoRepository.GetAllByTurmaId(registroPresenca.TurmaId);

            if (alunos == null || alunos.Any() == false)
                throw new AlunoNaoEncontrado(String.Format(NENHUM_ALUNO_ENCOTRADO_PARA_TURMA, registroPresenca.AnoTurma));

            var aula = _aulaRepository.GetById(registroPresenca.AulaId);

            if (aula == null)
                throw new AulaNaoEncontrada(String.Format(NENHUMA_AULA_ENCOTRADA_NESTA_DATA, registroPresenca.Data));

            foreach (var item in registroPresenca.Alunos)
            {
                var aluno = alunos.First(x => x.Id == item.AlunoId);

                aluno.RegistraPresenca(aula, item.Status);

                _alunoRepository.Update(aluno);
            }

            aula.ChamadaRealizada = true;

            _aulaRepository.Update(aula);

            _unitOfWork.Commit();
        }

        public void Update(AulaDTO aulaDto)
        {
            Aula aula = _aulaRepository.GetById(aulaDto.Id);

            aula.Data = aulaDto.DataAula;

            _aulaRepository.Update(aula);

            _unitOfWork.Commit();
        }

        public void Delete(int id)
        {
            _aulaRepository.Delete(id);

            _unitOfWork.Commit();
        }

        public AulaDTO GetById(int id)
        {
            var aula = _aulaRepository.GetById(id);

            return Mapper.Map<AulaDTO>(aula);
        }

        public IEnumerable<AulaDTO> GetAllByTurma(int id)
        {
            return _aulaRepository
                .GetAllByTurmaId()
                .Select(aula => Mapper.Map<AulaDTO>(aula))
                .Where(aula => aula.TurmaId == id)
                .ToList();
        }

        public ChamadaDTO GetChamadaByAula(AulaDTO aulaDTO)
        {
            var chamada = new ChamadaDTO();

            chamada.AnoTurma = aulaDTO.AnoTurma;
            chamada.Data = aulaDTO.DataAula;

            Aula aula = _aulaRepository.GetById(aulaDTO.Id);

            chamada.ChamadaRealizada = aula.ChamadaRealizada;


            if (aula.ChamadaRealizada)
            {
                chamada.Alunos = aula.Presencas
                    .Select(x => new ChamadaAlunoDTO
                        (x.Aluno.Id, x.Aluno.Nome, x.StatusPresenca)).ToList();
            }
            else
            {
                var alunos = _alunoRepository.GetAllByTurmaId(aulaDTO.TurmaId);

                chamada.Alunos = alunos
                    .Select(x => new ChamadaAlunoDTO
                        (x.Id, x.Nome, "C")).ToList();
            }

            return chamada;
        }

        public ChamadaDTO GetChamadaByAula(int id)
        {
            return GetChamadaByAula(GetById(id));
        }

        public IList<AulaDTO> GetAll()
        {
            return _aulaRepository.GetAll()
                .Select(aula => Mapper.Map<AulaDTO>(aula))
                .ToList();
        }
    }
}