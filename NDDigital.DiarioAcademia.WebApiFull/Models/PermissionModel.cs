using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NDDigital.DiarioAcademia.WebApiFull.Filters;

namespace NDDigital.DiarioAcademia.WebApi.Models
{
    public class PermissionModel
    {
        public string Id { get;  set; }
        public string Name { get;  set; }
        public string DisplayName { get;  set; }

        public static List<PermissionModel> Get()
        {
            var list = new List<PermissionModel>
            {
                new PermissionModel
                {
                    Id =Claim.Aluno_List,
                    Name="app.aluno.list",
                    DisplayName="header.LIST_STUDENT"
                },
                   #region ...

                new PermissionModel
                {
                    Id = Claim.Aluno_Details,
                    Name="app.aluno.details",
                    DisplayName="header.EDIT_STUDENT"
                },


                new PermissionModel
                {
                    Id = Claim.Aluno_Create,
                    Name="app.aluno.create",
                    DisplayName="header.CREATE_STUDENT"
                },

                new PermissionModel
                {
                    Id = Claim.Aula_List,
                    Name="app.aula.list",
                    DisplayName="header.LIST_LESSON"
                },

                new PermissionModel
                {
                    Id = Claim.Aula_Create,
                    Name="app.aula.create",
                    DisplayName="header.CREATE_LESSON"
                },

                new PermissionModel
                {
                    Id = Claim.Chamada_Create,
                    Name="app.chamada",
                    DisplayName="header.CLASS_REGISTER"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_User_List,
                    Name="app.user.list",
                    DisplayName="header.LIST_USERS"
                },


                new PermissionModel
                {
                    Id = Claim.Manager_User_Edit,
                    Name="app.user.edit",
                    DisplayName="header.CREATE_USERS"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_User_Group_Edit,
                    Name="app.user.groupEdit",
                    DisplayName="header.EDIT_USERS_GROUP"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_List,
                    Name="app.group.list",
                    DisplayName="header.LIST_GROUPS"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Create,
                    Name="app.group.create",
                    DisplayName="header.CREATE_GROUPS"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Edit,
                    Name="app.group.edit",
                    DisplayName="header.EDIT_GROUPS"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Permission_Edit,
                    Name="app.group.permissionsEdit",
                    DisplayName="header.EDIT_GROUPS_PERMISSIONS"
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Permission_List,
                    Name= "app.permission",
                    DisplayName="header.LIST_PERMISSIONS"
                },

                new PermissionModel
                {
                    Id = Claim.Turma_List,
                    Name= "app.turma.list",
                    DisplayName="header.LIST_CLASS"
                },

                new PermissionModel
                {
                    Id = Claim.Turma_Create,
                    Name= "app.turma.create",
                    DisplayName="header.CREATE_CLASS"
                },


                new PermissionModel
                {
                    Id = Claim.Turma_Details,
                    Name= "app.turma.details",
                    DisplayName="header.EDIT_CLASS"
                },

                new PermissionModel
                {
                    Id = Claim.Custon_Excluir_Aluno,
                    Name= "action.deleteAluno",
                    DisplayName="header.REMOVE_STUDENT"
                },


                new PermissionModel
                {
                    Id = Claim.Custon_Delete_Turma,
                    Name= "action.deleteTurma",
                    DisplayName="header.REMOVE_CLASS"
                },
            #endregion
            };

            list.ForEach((x)=> { x.Id = x.Id.Split('.')[1]; });
            return list;

        }

    }
}