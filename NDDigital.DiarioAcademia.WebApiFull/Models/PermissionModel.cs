using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using NDDigital.DiarioAcademia.WebApiFull.Models;

namespace NDDigital.DiarioAcademia.WebApi.Models
{
    public class PermissionModel
    {
        public string PermissionId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Filter { get; set; }


        public static List<PermissionModel> Get()
        {
            var list = new List<PermissionModel>
            {
                new PermissionModel
                {
                    PermissionId = Claim.Aluno_List,
                    Name="app.aluno.list",
                    DisplayName="header.LIST_STUDENT",
                    Filter = "STUDENT"
                },
                   #region ...

                new PermissionModel
                {
                    PermissionId = Claim.Aluno_Details,
                    Name="app.aluno.details",
                    DisplayName="header.EDIT_STUDENT",
                    Filter = "STUDENT"
                },
                new PermissionModel
                {
                    PermissionId = Claim.Aluno_Create,
                    Name="app.aluno.create",
                    DisplayName="header.CREATE_STUDENT",
                    Filter = "STUDENT"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Aula_List,
                    Name="app.aula.list",
                    DisplayName="header.LIST_LESSON",
                    Filter = "LESSON"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Aula_Create,
                    Name="app.aula.create",
                    DisplayName="header.CREATE_LESSON",
                    Filter = "LESSON"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Chamada_Create,
                    Name="app.chamada",
                    DisplayName="header.CLASS_REGISTER",
                    Filter = "LESSON"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_User_List,
                    Name="app.user.list",
                    DisplayName="header.LIST_USERS",
                    Filter = "LESSON"
                },


                new PermissionModel
                {
                    PermissionId = Claim.Manager_User_Edit,
                    Name="app.user.details",
                    DisplayName="header.CREATE_USERS",
                    Filter = "USER"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_User_Group_Edit,
                    Name="app.user.groupEdit",
                    DisplayName="header.EDIT_USERS_GROUP",
                    Filter = "USER"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_Group_List,
                    Name="app.group.list",
                    DisplayName="header.LIST_GROUPS",
                    Filter = "GROUP"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_Group_Create,
                    Name="app.group.create",
                    DisplayName="header.CREATE_GROUPS",
                    Filter = "GROUP"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_Group_Edit,
                    Name="app.group.details",
                    DisplayName="header.EDIT_GROUPS",
                    Filter = "GROUP"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_Group_Permission_Edit,
                    Name="app.group.permissionsEdit",
                    DisplayName="header.EDIT_GROUPS_PERMISSIONS",
                    Filter = "GROUP"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Manager_Permission_List,
                    Name= "app.permission",
                    DisplayName="header.LIST_PERMISSIONS",
                    Filter = "PERMISSION"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Turma_List,
                    Name= "app.turma.list",
                    DisplayName="header.LIST_CLASS",
                    Filter = "CLASS"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Turma_Create,
                    Name= "app.turma.create",
                    DisplayName="header.CREATE_CLASS",
                    Filter = "CLASS"
                },


                new PermissionModel
                {
                    PermissionId = Claim.Turma_Details,
                    Name= "app.turma.details",
                    DisplayName="header.EDIT_CLASS",
                    Filter = "CLASS"
                },

                new PermissionModel
                {
                    PermissionId = Claim.Custon_Excluir_Aluno,
                    Name= "action.deleteAluno",
                    DisplayName="header.REMOVE_STUDENT",
                    Filter = "CUSTOM"
                },
                new PermissionModel
                {
                    PermissionId = Claim.Custon_Delete_Turma,
                    Name= "action.deleteTurma",
                    DisplayName="header.REMOVE_CLASS",
                    Filter = "CUSTOM"
                },
            #endregion
            };
            list.ForEach((x) => { x.PermissionId = x.PermissionId.Split('.')[1]; });
            return list;
        }

    }
}