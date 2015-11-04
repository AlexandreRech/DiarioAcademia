using AutoMapper;
using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Profiles;
using NDDigital.DiarioAcademia.Dominio;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace NDDigital.DiarioAcademia.Aplicacao.Services
{
    public interface ITurmaService : IService<TurmaDTO> { }

    public class TurmaService : ITurmaService
    {
        private IUnitOfWork _unitOfWork;
        private ITurmaRepository _turmaRepository;

        public TurmaService(ITurmaRepository repoTurma, IUnitOfWork unitOfWork)
        {
            _turmaRepository = repoTurma;
            _unitOfWork = unitOfWork;
        }

        public void Add(TurmaDTO turmaDto)
        {
            try
            {
                Turma turma = Mapper.Map<Turma>(turmaDto);

                _turmaRepository.Add(turma);

                _unitOfWork.Commit();
            }
            catch (Exception te)
            {
                _unitOfWork.Rollback();
                throw new Exception(te.Message);
            }
        }

        public void Update(TurmaDTO turmaDto)
        {
            try
            {
                Turma turma = _turmaRepository.GetById(turmaDto.Id);

                turma.Ano = turmaDto.Ano;

                _turmaRepository.Update(turma);

                _unitOfWork.Commit();
            }
            catch (Exception te)
            {
                _unitOfWork.Rollback();
                throw new Exception(te.Message);
            }
        }

        public void Delete(int id)
        {
            try
            {
                _turmaRepository.Delete(id);

                _unitOfWork.Commit();
            }
            catch (DbUpdateException te)
            {
                _unitOfWork.Rollback();
                throw new ApplicationException(Resource.EXCEPTION_TURMA_COM_ALUNOS_RELACIONADOS);
            }

        }

        public TurmaDTO GetById(int id)
        {
            var turma = _turmaRepository.GetById(id);

            return new TurmaDTO
            {
                Id = turma.Id,
                Ano = turma.Ano
            };
        }

        public IList<TurmaDTO> GetAll()
        {
            return _turmaRepository
                .GetAll()
                .Select(turma => new TurmaDTO(turma))
                .ToList();
        }
    }
}