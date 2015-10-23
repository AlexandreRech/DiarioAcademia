using Infraestrutura.DAO.SQL.Common;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;

namespace NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories
{
    public class AlunoRepositorySql : RepositoryBaseADO, IAlunoRepository
    {
        #region Querys

        public const string SqlInsert =
            @"INSERT INTO TBAluno
                  (Endereco_Cep
                  ,Endereco_Bairro
                  ,Endereco_Localidade
                  ,Endereco_Uf
                  ,Nome
                  ,Turma_Id)
            VALUES
                  ({0}Endereco_Cep,
                   {0}Endereco_Bairro,
                   {0}Endereco_Localidade,
                   {0}Endereco_Uf,
                   {0}Nome,
                   {0}Turma_Id)";

        public const string SqlUpdate =
            @"UPDATE TBAluno SET
                    Endereco_Cep = {0}Endereco_Cep
                   ,Endereco_Bairro = {0}Endereco_Bairro
                   ,Endereco_Localidade = {0}Endereco_Localidade
                   ,Endereco_Uf = {0}Endereco_Uf
                   ,Nome = {0}Nome
                   ,Turma_Id = {0}Turma_Id
              WHERE Id = {0}Id";

        public const string SqlDelete =
            @"DELETE FROM TBAluno WHERE Id = {0}id";

        public const string SqlSelect =
            @"SELECT A.Id,A.Endereco_Cep,A.Endereco_Bairro
                  ,A.Endereco_Localidade,A.Endereco_Uf
                  ,A.Nome,A.Turma_Id
                  ,T.Ano
              FROM TBAluno AS A
              INNER JOIN TBTurma AS T ON T.Id = A.Turma_Id";

        public const string SqlSelectById =
            @"SELECT A.Id,A.Endereco_Cep,A.Endereco_Bairro
                  ,A.Endereco_Localidade,A.Endereco_Uf
                  ,A.Nome,A.Turma_Id
                  ,T.Ano
              FROM TBAluno AS A
              INNER JOIN TBTurma AS T ON T.Id = A.Turma_Id
              WHERE A.Id = {0}Id";

        public const string SqlUpdatePresenca =
            @"UPDATE TBPresenca SET StatusPresenca = {0}StatusPresenca,
                                    Aula_Id = {0}Aula_Id,
                                    Aluno_Id = {0}Aluno_Id
              WHERE Id = {0}Id";

        public const string SqlCount = @"SELECT COUNT(*) AS count FROM TBAluno";

        private PresencaRepositorySql _repoPresenca;

        #endregion Querys

        public AlunoRepositorySql(AdoNetFactory factory)
            : base(factory)
        {
            _repoPresenca = new PresencaRepositorySql(factory);
        }

        public Aluno Add(Aluno entity)
        {
            try
            {
               entity.Id= Insert(SqlInsert, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar adicionar um aluno!" + te.Message);
            }

            return entity;
        }

        public void Delete(int id)
        {
            try
            {
                var alunoRemovido = GetById(id);

                Delete(SqlDelete, Take(alunoRemovido));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar um aluno!" + te.Message);
            }
        }

        public void Delete(Aluno entity)
        {
            try
            {
                Delete(SqlDelete, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar um aluno!" + te.Message);
            }
        }

        public IList<Aluno> GetAll()
        {
            IList<Aluno> listaAlunos = null;

            try
            {
                listaAlunos = GetAll(SqlSelect, Make);

                foreach (var aluno in listaAlunos)
                {
                    aluno.Presencas = _repoPresenca.GetAllByAluno(aluno.Id);
                }
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar buscar todos os aluno!" + te.Message);
            }

            return listaAlunos;
        }

        public Aluno GetById(int id)
        {
            Aluno aluno = null;

            try
            {
                var parms = new object[] { "Id", id };

                aluno = Get(SqlSelectById, Make, parms);

                aluno.Presencas = _repoPresenca.GetAllByAluno(id);
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar buscar todos os aluno!" + te.Message);
            }

            return aluno;
        }

        public void Update(Aluno entity)
        {
            try
            {
                var aluno = GetById(entity.Id);

                var presencas = ComparaPresencas(entity, aluno);

                if (presencas != null)
                {
                    RealizaChamada(presencas);
                }

                Update(SqlUpdate, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar editar uma Aula!" + te.Message);
            }
        }

        public Aluno GetByIdIncluding(int id, params Expression<Func<Aluno, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IList<Aluno> GetMany(Expression<Func<Aluno, bool>> where)
        {
            throw new NotImplementedException();
        }

        public IList<Aluno> GetAllIncluding(params Expression<Func<Aluno, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IList<Aluno> GetAllByTurmaId(int turmaId)
        {
            return GetAll()
                .Where(a => a.Turma.Id == turmaId)
                .ToList();
        }

        #region Métodos privados

        private void RealizaChamada(IEnumerable<Presenca> presencas)
        {
            foreach (var presenca in presencas)
            {
                if (presenca.Aula.ChamadaRealizada)
                {
                    _repoPresenca.Update(presenca);
                }
                else
                {
                    _repoPresenca.Add(presenca);
                }
            }
        }

        private static IEnumerable<Presenca> ComparaPresencas(Aluno entity, Aluno aluno)
        {
            var presencas = entity.Presencas.Where(x =>
            {
                var existing = aluno.Presencas
                    .FirstOrDefault(a => x.Id == a.Id
                        &&
                        x.StatusPresenca == a.StatusPresenca);

                if (existing != null)
                    return false;
                else
                    return true;
            });
            return presencas;
        }

        private static Aluno Make(IDataReader reader)
        {
            Aluno aluno = new Aluno();
            aluno.Id = Convert.ToInt32(reader["Id"]);
            aluno.Nome = Convert.ToString(reader["Nome"]);
            aluno.Turma = new Turma
            {
                Id = Convert.ToInt32(reader["Turma_Id"]),
                Ano = Convert.ToInt32(reader["Ano"])
            };
            aluno.Endereco = new Endereco
            {
                Cep = Convert.ToString(reader["Endereco_Cep"]),
                Localidade = Convert.ToString(reader["Endereco_Localidade"]),
                Bairro = Convert.ToString(reader["Endereco_Bairro"]),
                Uf = Convert.ToString(reader["Endereco_Uf"])
            };

            return aluno;
        }

        private static object[] Take(Aluno aluno)
        {
            return new object[]
            {
                "Id", aluno.Id,
                "Nome", aluno.Nome,
                "Turma_Id", aluno.Turma.Id,
                "Endereco_Cep", aluno.Endereco.Cep,
                "Endereco_Localidade", aluno.Endereco.Localidade,
                "Endereco_Bairro", aluno.Endereco.Bairro,
                "Endereco_Uf", aluno.Endereco.Uf
            };
        }

        public int GetCount()
        {
            return Get(SqlCount, (IDataReader reader) => { return Convert.ToInt32(reader["count"]); });
        }

        #endregion Métodos privados


        public IQueryable<Aluno> GetAlunos()
        {
            return GetAll().AsQueryable();
        }
    }
}