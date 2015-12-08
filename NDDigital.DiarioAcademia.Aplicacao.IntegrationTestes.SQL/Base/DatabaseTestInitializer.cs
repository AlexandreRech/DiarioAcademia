using Infraestrutura.DAO.SQL.Common;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.SQL.Common;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class DatabaseTestInitializer
    {
        public DatabaseTestInitializer(IUnitOfWork Uow, AdoNetFactory factory)
        {
            repo = new RepositoryBaseADO(factory);
            Truncate();
            Uow.Commit();
            Seed();
            Uow.Commit();
        }
        RepositoryBaseADO repo;
        protected void Seed()
        {
            repo.Update(Query);
        }
        protected void Truncate()
        {
            var entityTables = new[] { "TBPresenca", "TBAula", "TBAluno", "TBTurma" };
            var authTables = new[] { "TBGroup", "TBAccount", "TBAccount", "TBClaim", "TBPermission" };
            var authNoReseed = new[] { "TBAccountGroups", "TBGroupClaim", "TBClaimPermission", "TBUser" };

            Truncate(authNoReseed, reseed: false);
            Truncate(authTables);
            Truncate(entityTables);
        }
        private void Truncate(string[] tables, bool reseed = true)
        {
            var query = string.Empty;

            if (reseed)
                foreach (var table in tables)
                    query += string.Format(" DBCC CHECKIDENT ('[{0}]', RESEED, 0)", table);
            foreach (var table in tables)
                query += string.Format(" DELETE FROM {0}", table);

            repo.Update(query);
        }

        private const string Query = @"

            SET IDENTITY_INSERT [dbo].[TBTurma] ON 
            INSERT [dbo].[TBTurma] ([Id], [Ano]) VALUES (1, 2014)
            INSERT [dbo].[TBTurma] ([Id], [Ano]) VALUES (3, 2014)
            INSERT [dbo].[TBTurma] ([Id], [Ano]) VALUES (4, 2014)
            INSERT [dbo].[TBTurma] ([Id], [Ano]) VALUES (5, 2014)
            SET IDENTITY_INSERT [dbo].[TBTurma] OFF

            SET IDENTITY_INSERT [dbo].[TBAluno] ON 
            INSERT [dbo].[TBAluno] ([Id], [Endereco_Cep], [Endereco_Bairro], [Endereco_Localidade], [Endereco_Uf], [Nome], [Turma_Id]) VALUES (1, NULL, NULL, NULL, NULL, N'Thiago Sartor', 1)
            SET IDENTITY_INSERT [dbo].[TBAluno] OFF
            
            SET IDENTITY_INSERT [dbo].[TBAula] ON         
            INSERT [dbo].[TBAula] ([Id], [ChamadaRealizada], [Data], [Turma_Id]) VALUES (1, 0, CAST(0x943A0B00 AS Date), 1)
            SET IDENTITY_INSERT [dbo].[TBAula] OFF
            
            SET IDENTITY_INSERT [dbo].[TBPresenca] ON 
            INSERT [dbo].[TBPresenca] ([Id], [StatusPresenca], [Aula_Id], [Aluno_Id]) VALUES (1, N'C', 1, 1)
            SET IDENTITY_INSERT [dbo].[TBPresenca] OFF
            
            SET IDENTITY_INSERT [dbo].[TBAccount] ON       
            INSERT [dbo].[TBAccount] ([Id], [Username]) VALUES (1, N'username 1')
            SET IDENTITY_INSERT [dbo].[TBAccount] OFF
            INSERT [dbo].[TBUser] ([Id], [FirstName], [LastName], [Email], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName], [Account_Id]) VALUES (N'cd0a44c2-a317-4c16-91d9-4ef5b2d68dd6', N'joao', N'da silva', NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 0, N'username 1', 1)
            
            SET IDENTITY_INSERT [dbo].[TBGroup] ON    
            INSERT [dbo].[TBGroup] ([Id], [Name], [IsAdmin]) VALUES (1, N'Grupo 2', 1)
            INSERT [dbo].[TBGroup] ([Id], [Name], [IsAdmin]) VALUES (2, N'Grupo 5', 0)
            SET IDENTITY_INSERT [dbo].[TBGroup] OFF

            INSERT [dbo].[TBAccountGroups] ([Account_Id], [Group_Id]) VALUES (1, 1)
            INSERT [dbo].[TBAccountGroups] ([Account_Id], [Group_Id]) VALUES (1, 2)
            
            SET IDENTITY_INSERT [dbo].[TBPermission] ON       
            INSERT [dbo].[TBPermission] ([Id], [PermissionId]) VALUES (1, N'3')
            INSERT [dbo].[TBPermission] ([Id], [PermissionId]) VALUES (2, N'4')
            INSERT [dbo].[TBPermission] ([Id], [PermissionId]) VALUES (3, N'6')
            INSERT [dbo].[TBPermission] ([Id], [PermissionId]) VALUES (4, N'7')
            SET IDENTITY_INSERT [dbo].[TBPermission] OFF

  
            SET IDENTITY_INSERT [dbo].[TBClaim] ON         
            INSERT [dbo].[TBClaim] ([Id], [Name]) VALUES (1, N'action.deleteTurma')
            INSERT [dbo].[TBClaim] ([Id], [Name]) VALUES (2, N'app.chamada')
            SET IDENTITY_INSERT [dbo].[TBClaim] OFF

            INSERT [dbo].[TBClaimPermission] ([Claim_Id], [Permission_Id]) VALUES (1, 1)
            INSERT [dbo].[TBClaimPermission] ([Claim_Id], [Permission_Id]) VALUES (1, 2)
            INSERT [dbo].[TBClaimPermission] ([Claim_Id], [Permission_Id]) VALUES (2, 3)
            INSERT [dbo].[TBClaimPermission] ([Claim_Id], [Permission_Id]) VALUES (2, 4)

            INSERT [dbo].[TBGroupClaim] ([Group_Id], [Claim_Id]) VALUES (1, 1)
            INSERT [dbo].[TBGroupClaim] ([Group_Id], [Claim_Id]) VALUES (2, 2)
            ";
    }
}