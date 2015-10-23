using Infraestrutura.DAO.SQL.Common;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Linq;

namespace NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories
{
    public class TurmaRepositorySql : RepositoryBaseADO, ITurmaRepository
    {
        #region Querys

        public const string SqlInsert =
            @"INSERT INTO TBTurma (Ano) VALUES ({0}Ano)";

        public const string SqlUpdate =
            @"UPDATE TBTurma SET Ano = {0}Ano WHERE Id = {0}Id";

        public const string SqlDelete =
            @"DELETE FROM TBTurma WHERE Id = {0}Id";

        public const string SqlSelect =
            @"SELECT * FROM TBTurma";

        public const string SqlSelectbId =
            @"SELECT * FROM TBTurma WHERE Id = {0}Id";
        public const string SqlCount = @"SELECT COUNT(*) AS count FROM TBAula";

        #endregion Querys

        public TurmaRepositorySql(AdoNetFactory factory)
            : base(factory)
        {
        }

        public Turma Add(Turma turma)
        {
            try
            {
                turma.Id = Insert(SqlInsert, Take(turma));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar adicionar uma Turma!" + te.Message);
            }

            return turma;
        }

        public void Delete(int id)
        {
            try
            {
                var turmaRemovida = GetById(id);
                Delete(SqlDelete, Take(turmaRemovida));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar uma Turma!" + te.Message);
            }
        }

        public void Delete(Turma entity)
        {
            try
            {
                var turmaRemovida = GetById(entity.Id);

                var parms = new object[] { "Id", entity.Id };

                Delete(SqlDelete, Take(turmaRemovida));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar uma Turma!" + te.Message);
            }
        }

        public IList<Turma> GetAll()
        {
            try
            {
                return GetAll<Turma>(SqlSelect, Make);
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar listar todas as Turmas!" + te.Message);
            }
        }

        public Turma GetById(int id)
        {
            try
            {
                var parms = new object[] { "Id", id };

                return Get(SqlSelectbId, Make, parms);
            }
            catch (Exception te)
            {
                return null;
                throw new Exception("Erro ao tentar encontrar a turma!" + te.Message);
            }
        }

        public void Update(Turma entity)
        {
            try
            {
                Update(SqlUpdate, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar editar uma Turma!" + te.Message);
            }
        }

        public IList<Turma> GetAllIncluding(params Expression<Func<Turma, object>>[] includeProperties)
        {
            return GetAll().ToList();
        }

        public Turma GetByIdIncluding(int id, params Expression<Func<Turma, object>>[] includeProperties)
        {
            return GetById(id);
        }

        public IList<Turma> GetMany(Expression<Func<Turma, bool>> where)
        {
            return GetAll().ToList();
        }

        #region Métodos privados

        private static Turma Make(IDataReader reader)
        {
            Turma turma = new Turma();

            turma.Id = Convert.ToInt32(reader["Id"]);
            turma.Ano = Convert.ToInt32(reader["Ano"]);

            return turma;
        }

        private static object[] Take(Turma turma)
        {
            return new object[]
            {
                "Id", turma.Id,
                "Ano", turma.Ano
            };
        }

        public int GetCount()
        {
            return Get(SqlCount, (IDataReader reader) => { return Convert.ToInt32(reader["count"]); });
        }

        #endregion
    }
}