using Infraestrutura.DAO.SQL.Common;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;

public class PresencaRepositorySql : RepositoryBaseADO, IPresencaRepository
{
    #region Querys

    public const string SqlInsert =
         @"INSERT INTO TBPresenca (StatusPresenca, Aula_Id, Aluno_Id)
                VALUES ({0}StatusPresenca, {0}Aula_Id, {0}Aluno_Id)";

    public const string SqlUpdate =
         @"UPDATE TBPresenca SET StatusPresenca = {0}StatusPresenca,
                                    Aula_Id = {0}Aula_Id,
                                    Aluno_Id = {0}Aluno_Id
              WHERE Id = {0}Id";

    public const string SqlDelete =
         @"DELETE FROM TBPresenca WHERE Id = {0}Id";

    public const string SqlSelect =
         @"SELECT P.Id,P.StatusPresenca,P.Aula_Id,P.Aluno_Id,
	                 AL.Data, AL.ChamadaRealizada, AL.Turma_Id,
	                 A.Nome, A.Endereco_Cep, A.Endereco_Bairro, A.Endereco_Localidade, A.Endereco_Uf,
	                 T.Ano
              FROM TBPresenca AS P
                  INNER JOIN TBAula AS AL ON AL.Id = P.Aula_Id
                  INNER JOIN TBAluno AS A ON A.Id = P.Aluno_Id
                  INNER JOIN TBTurma AS T ON T.Id = AL.Turma_Id";

    public const string SqlSelectbId =
         @"SELECT P.Id,P.StatusPresenca,P.Aula_Id,P.Aluno_Id,
	                 AL.Data, AL.ChamadaRealizada, AL.Turma_Id,
	                 A.Nome, A.Endereco_Cep, A.Endereco_Bairro, A.Endereco_Localidade, A.Endereco_Uf,
	                 T.Ano
              FROM TBPresenca AS P
                  INNER JOIN TBAula AS AL ON AL.Id = P.Aula_Id
                  INNER JOIN TBAluno AS A ON A.Id = P.Aluno_Id
                  INNER JOIN TBTurma AS T ON T.Id = AL.Turma_Id
              WHERE P.Id = {0}Id";

    public const string SqlSelectByAluno =
         @"SELECT P.Id,P.StatusPresenca,P.Aula_Id,P.Aluno_Id,
	                     AL.Data, AL.ChamadaRealizada, AL.Turma_Id,
	                     A.Nome, A.Endereco_Cep, A.Endereco_Bairro, A.Endereco_Localidade, A.Endereco_Uf,
	                     T.Ano
                  FROM TBPresenca AS P
                      INNER JOIN TBAula AS AL ON AL.Id = P.Aula_Id
                      INNER JOIN TBAluno AS A ON A.Id = P.Aluno_Id
                      INNER JOIN TBTurma AS T ON T.Id = AL.Turma_Id
                  WHERE P.Aluno_Id = {0}Id_Aluno";

    public const string SqlSelectByAula =
         @"SELECT P.Id,P.StatusPresenca,P.Aula_Id,P.Aluno_Id,
	                     AL.Data, AL.ChamadaRealizada, AL.Turma_Id,
	                     A.Nome, A.Endereco_Cep, A.Endereco_Bairro, A.Endereco_Localidade, A.Endereco_Uf,
	                     T.Ano
                  FROM TBPresenca AS P
                      INNER JOIN TBAula AS AL ON AL.Id = P.Aula_Id
                      INNER JOIN TBAluno AS A ON A.Id = P.Aluno_Id
                      INNER JOIN TBTurma AS T ON T.Id = AL.Turma_Id
                  WHERE P.Aula_Id = {0}Id_Aula";

    private ADOUnitOfWork _uow;

    #endregion Querys

    public PresencaRepositorySql(AdoNetFactory factory)
        : base(factory)
    {
    }

    public Presenca Add(Presenca presenca)
    {
        try
        {
           presenca.Id= Insert(SqlInsert, Take(presenca));
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar adicionar uma Presenca!" + te.Message);
        }

        return presenca;
    }

    public void Delete(int id)
    {
        try
        {
            var presencaRemovida = GetById(id);

            Delete(SqlDelete, Take(presencaRemovida));
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar deletar uma Presenca!" + te.Message);
        }
    }

    public void Delete(Presenca entity)
    {
        try
        {
            var presencaRemovida = GetById(entity.Id);

            Delete(SqlDelete, Take(presencaRemovida));

            _uow.Commit();
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar deletar uma Presenca!" + te.Message);
        }
    }

    public IList<Presenca> GetAll()
    {
        try
        {
            return GetAll<Presenca>(SqlSelect, Make);
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar listar todas as Presencas!" + te.Message);
        }
    }

    public Presenca GetById(int id)
    {
        try
        {
            var parms = new object[] { "Id", id };

            return Get(SqlSelectbId, Make, parms);
        }
        catch (Exception te)
        {
            return null;
            throw new Exception("Erro ao tentar encontrar a presenca!" + te.Message);
        }
    }

    public void Update(Presenca entity)
    {
        try
        {
            Update(SqlUpdate, Take(entity));
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar editar uma Presenca!" + te.Message);
        }
    }

    public List<Presenca> GetAllByAluno(int idAluno)
    {
        List<Presenca> listPresenca = null;
        try
        {
            var parms = new object[] { "Id_Aluno", idAluno };

            listPresenca = GetAll(SqlSelectByAluno, Make, parms);
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar encontrar a presenca!" + te.Message);
        }

        return listPresenca;
    }

    public List<Presenca> GetAllByAula(int idAula)
    {
        List<Presenca> listPresenca = null;
        try
        {
            var parms = new object[] { "Id_Aula", idAula };

            listPresenca = GetAll(SqlSelectByAula, Make, parms);
        }
        catch (Exception te)
        {
            throw new Exception("Erro ao tentar encontrar a presenca!" + te.Message);
        }

        return listPresenca;
    }

    public IList<Presenca> GetAllIncluding(params Expression<Func<Presenca, object>>[] includeProperties)
    {
        return GetAll();
    }

    public Presenca GetByIdIncluding(int id, params Expression<Func<Presenca, object>>[] includeProperties)
    {
        return GetById(id);
    }

    public IList<Presenca> GetMany(Expression<Func<Presenca, bool>> where)
    {
        return GetAll();
    }

    #region Métodos privados

    private static object[] Take(Presenca presenca)
    {
        return new object[]
        {
           "Id", presenca.Id,
           "Aluno_Id", presenca.Aluno.Id,
           "Nome", presenca.Aluno.Nome,
           "Aula_Id", presenca.Aula.Id,
           "StatusPresenca", presenca.StatusPresenca,
        };
    }

    private static Presenca Make(IDataReader reader)
    {
        Presenca presenca = new Presenca();

        presenca.Id = Convert.ToInt32(reader["Id"]);
        presenca.Aluno = new Aluno
        {
            Id = Convert.ToInt32(reader["Aluno_Id"]),
            Nome = Convert.ToString(reader["Nome"]),
            Turma = new Turma
            {
                Id = Convert.ToInt32(reader["Turma_Id"]),
                Ano = Convert.ToInt32(reader["Ano"]),
            },
            Endereco = new Endereco
            {
                Cep = Convert.ToString(reader["Endereco_Cep"]),
                Localidade = Convert.ToString(reader["Endereco_Localidade"]),
                Bairro = Convert.ToString(reader["Endereco_Bairro"]),
                Uf = Convert.ToString(reader["Endereco_Uf"])
            }
        };
        presenca.Aula = new Aula
        {
            Id = Convert.ToInt32(reader["Aula_Id"]),
            Data = Convert.ToDateTime(reader["Data"]),
            ChamadaRealizada = Convert.ToBoolean(reader["ChamadaRealizada"]),
            Turma = new Turma
            {
                Id = Convert.ToInt32(reader["Turma_Id"]),
                Ano = Convert.ToInt32(reader["Ano"]),
            },
        };
        presenca.StatusPresenca = Convert.ToString(reader["StatusPresenca"]);

        return presenca;
    }

    public int GetCount()
    {
        throw new NotImplementedException();
    }

    #endregion Métodos privados
}