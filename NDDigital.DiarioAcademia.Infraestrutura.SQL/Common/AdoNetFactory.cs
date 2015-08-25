﻿using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Factorys;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using System.Configuration;
using System.Data.Common;

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
        private DbTransaction _transaction;
        private DbCommand _command;

        #endregion Attributos

        public AdoNetFactory()
        {
            Connection = factory.CreateConnection();

            Connection.ConnectionString = connectionString;

            Command = factory.CreateCommand();

            Command.Connection = Connection;

            Connection.Open();

            Command.Transaction = Connection.BeginTransaction();
        }

        public DbConnection Connection
        {
            get { return _connection; }

            set { _connection = value; }
        }

        public DbTransaction Transaction
        {
            get { return _transaction; }

            set { _transaction = value; }
        }

        public DbCommand Command
        {
            get { return _command; }

            set { _command = value; }
        }

        public override IUnitOfWork Create()
        {
            return new ADOUnitOfWork(new AdoNetFactory());
        }
    }
}