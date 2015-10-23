using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Factorys;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System;
using System.Data.SqlClient;

namespace NDDigital.DiarioAcademia.Infraestrutura.SQL.Common
{
    public class AdoNetFactory : UnitOfWorkFactory
    {
        #region Attributos

        private static readonly string connectionStringName =
            ConfigurationManager.AppSettings.Get("connectionDB");

        private static readonly string providerName =
            ConfigurationManager.ConnectionStrings[connectionStringName].ProviderName;

        private static readonly string connectionString =
            ConfigurationManager.ConnectionStrings[connectionStringName].ConnectionString;

        private static readonly DbProviderFactory factory =
            DbProviderFactories.GetFactory(providerName);

        private DbConnection _connection;
        private DbCommand _command;

        #endregion Attributos

        public AdoNetFactory()
        {
            AbreConexao();
        }

        public void AbreConexao()
        {
            Connection = factory.CreateConnection();

            Connection.ConnectionString = connectionString;

            CriaCommand();

            Connection.Open();
        }

        public void BeginTransaction()
        {
            if (Command.Transaction == null)
                Command.Transaction = Connection.BeginTransaction();
        }

        public override IUnitOfWork Create()
        {
            if (Connection.State == ConnectionState.Open)
            {
                Connection.Close();
            }

            return new ADOUnitOfWork(new AdoNetFactory());
        }

        public DbConnection Connection
        {
            get { return _connection; }

            set { _connection = value; }
        }

        public DbCommand Command
        {
            get { return _command; }

            set { _command = value; }
        }

     
        internal void CriaCommand(bool existingTransaction=false)
        {
            if (existingTransaction)
            {
                var trans = Command.Transaction;
                Command = Connection.CreateCommand();
                Command.Transaction = trans;
            }
            else
            {
                Command = factory.CreateCommand();
                Command.Connection = Connection;
            }
        }
    }
}