using Infrasctructure.DAO.ORM.Contexts;
using Microsoft.AspNet.Identity;
using Moq;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Contexts;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class DatabaseTestInitializer : DropCreateDatabaseAlways<EntityFrameworkContext>
    {
        public EntityFrameworkContext _entityContext;
        public AuthContext _authContext;
        private readonly Mock<UserRepository> _userRepository = null;
        public IUserStore<User> _store;

        public DatabaseTestInitializer()
        {
            var entityTables = new[] { "TBPresenca", "TBAula", "TBAluno", "TBTurma" };
            var authTables = new[] { "TBGroup", "TBAccount", "TBAccount", "TBPermission" };
            var authNoReseed = new[] { "TBAccountGroups", "TBGroupPermission", "TBUser" };

            _userRepository = new Mock<UserRepository>();

            _entityContext = new EntityFrameworkContext();
            _authContext = new AuthContext();

            TruncateTables(_authContext, authNoReseed, reseed: false);
            TruncateTables(_authContext, authTables);
            TruncateTables(_entityContext, entityTables);

            _entityContext.SaveChanges();
            _authContext.SaveChanges();

            SeedContext(_entityContext);
            SeedContext(_authContext);
        }

        protected void SeedContext(EntityFrameworkContext context)
        {
            base.Seed(context);

            //Adiciona uma turma
            context.Set<Turma>().Add(ObjectBuilder.CreateTurma());
            context.SaveChanges();

            //Busca a turma do id = 1
            var turmEncontrada = context.Set<Turma>().Find(1);

            //Adiciona um aluno
            context.Set<Aluno>().Add(ObjectBuilder.CreateAluno(turmEncontrada));
            context.SaveChanges();

            //Busca aluno do id = 1
            var alunoEncontrado = context.Set<Aluno>().Find(1);

            //Adiciona uma aula
            context.Set<Aula>().Add(ObjectBuilder.CreateAula(turmEncontrada));
            context.SaveChanges();

            //Busca aluno do id = 1
            var aulaEncontrada = context.Set<Aula>().Find(1);

            context.Set<Presenca>().Add(ObjectBuilder.CreatePresenca(alunoEncontrado,aulaEncontrada, "C"));
            context.SaveChanges();
        }

        protected void SeedContext(AuthContext context)
        {
            context.Set<User>().Add(ObjectBuilder.CreateUser());
            context.SaveChanges();
        }

        private void TruncateTables(DbContext context, string[] tables, bool reseed = true)
        {
            var query = string.Empty;

            if (reseed)
                foreach (var table in tables)
                    query += string.Format(" DBCC CHECKIDENT ('[{0}]', RESEED, 0)", table);
            foreach (var table in tables)
                query += string.Format(" DELETE FROM {0}", table);

            context.Database.ExecuteSqlCommand(query);
        }
    }
}