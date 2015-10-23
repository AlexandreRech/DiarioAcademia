using Infraestrutura.DAO.SQL.Common;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;

namespace NDDigital.DiarioAcademia.Infraestrutura.SQL.Repositories
{
    public class AulaRepositorySql : RepositoryBaseADO, IAulaRepository
    {
        #region Querys

        public const string SqlInsertAula =
             @"INSERT INTO TBAula
                (Data, ChamadaRealizada, Turma_Id) VALUES
                ({0}Data, {0}ChamadaRealizada, {0}Turma_Id)";

        public const string SqlUpdate =
             @"UPDATE TBAula SET
                Data = {0}Data,
                ChamadaRealizada = {0}ChamadaRealizada,
                Turma_Id = {0}Turma_Id
             WHERE Id = {0}Id";

        public const string SqlDelete =
            @"DELETE FROM TBAula WHERE Id = {0}Id";

        public const string SqlSelect =
            @"SELECT A.Id,A.ChamadaRealizada
                  ,A.Data,A.Turma_Id
	              ,T.Ano
              FROM TBAula AS A
              INNER JOIN TBTurma AS T ON A.Turma_Id = T.Id";

        public const string SqlSelectById =
            @"SELECT A.Id,A.ChamadaRealizada
                  ,A.Data,A.Turma_Id
	              ,T.Ano
              FROM TBAula AS A
              INNER JOIN TBTurma AS T ON A.Turma_Id = T.Id
              WHERE A.Id = {0}Id";
        public const string SqlCount = @"SELECT COUNT(*) AS count FROM TBAula";

        #endregion Querys

        public PresencaRepositorySql _repoPresenca;
        private ADOUnitOfWork _uow;

        public AulaRepositorySql(AdoNetFactory factory)
            : base(factory)
        {
            _repoPresenca = new PresencaRepositorySql(factory);
        }

        public Aula Add(Aula entity)
        {
            try
            {
               entity.Id= Insert(SqlInsertAula, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar adicionar uma Aula!" + te.Message);
            }
            return entity;
        }

        public void Delete(int id)
        {
            try
            {
                var aulaRemovida = GetById(id);
                Delete(SqlDelete, Take(aulaRemovida));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar uma Aula!" + te.Message);
            }
        }

        public void Delete(Aula entity)
        {
            try
            {
                var aulaRemovida = GetById(entity.Id);
                Delete(SqlDelete, Take(aulaRemovida));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar deletar uma Aula!" + te.Message);
            }
        }

        public IList<Aula> GetAll()
        {
            IList<Aula> listAulas = null;

            try
            {
                listAulas = GetAll(SqlSelect, Make);

                foreach (var aula in listAulas)
                {
                    aula.Presencas = _repoPresenca.GetAllByAula(aula.Id);
                }
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar listar todas as Aulas!" + te.Message);
            }

            return listAulas;
        }

        public IList<Aula> GetAllByTurmaId()
        {
            try
            {
                return GetAll();
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar listar todas as Aulas por determinada turma!" + te.Message);
            }
        }

        public Aula GetById(int id)
        {
            Aula aula = null;
            try
            {
                var parms = new object[] { "Id", id };

                aula = Get(SqlSelectById, Make, parms);

                aula.Presencas = _repoPresenca.GetAllByAula(id);
            }
            catch (Exception te)
            {
                throw new Exception(te.Message);
            }

            return aula;
        }

        public void Update(Aula entity)
        {
            List<Presenca> listaPresencas = null;

            try
            {
                Update(SqlUpdate, Take(entity));
            }
            catch (Exception te)
            {
                throw new Exception("Erro ao tentar editar uma Aula!" + te.Message);
            }
        }

        public IList<Aula> GetAllIncluding(params Expression<Func<Aula, object>>[] includeProperties)
        {
            return GetAll();
        }

        public Aula GetByIdIncluding(int id, params Expression<Func<Aula, object>>[] includeProperties)
        {
            return GetById(id);
        }

        public IList<Aula> GetMany(Expression<Func<Aula, bool>> where)
        {
            return GetAll();
        }

        #region Métodos privados

        private Aula Make(IDataReader reader)
        {
            Aula aula = new Aula();

            aula.Id = Convert.ToInt32(reader["Id"]);
            aula.Data = Convert.ToDateTime(reader["Data"]);
            aula.ChamadaRealizada = Convert.ToBoolean(reader["ChamadaRealizada"]);
            aula.Turma = new Turma
            {
                Id = Convert.ToInt32(reader["Turma_Id"]),
                Ano = Convert.ToInt32(reader["Ano"])
            };
            return aula;
        }

        private static object[] Take(Aula aula)
        {
            return new object[]
            {
                "Id", aula.Id,
                "Data", aula.Data,
                "ChamadaRealizada", aula.ChamadaRealizada,
                "Turma_Id", aula.Turma.Id,
                "Ano", aula.Turma.Ano
            };
        }

        public int GetCount()
        {
            return Get(SqlCount, (IDataReader reader) => { return Convert.ToInt32(reader["count"]); });
        }

        #endregion Métodos privados
    }
}