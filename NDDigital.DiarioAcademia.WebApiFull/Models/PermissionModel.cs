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
        public string Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public PermissionFilterModel Filter { get; set; }


        public static List<PermissionModel> Get()
        {
            #region Filters
            PermissionFilterModel filterStudent = new PermissionFilterModel("student", "filter.permission.STUDENT"),
                                  filterClass = new PermissionFilterModel("class", "filter.permission.CLASS"),
                                  filterCustom = new PermissionFilterModel("action", "filter.permission.CUSTOM"),
                                  filterLesson = new PermissionFilterModel("lesson", "filter.permission.LESSON"),
                                  filterClassRegister = new PermissionFilterModel("class_register", "filter.permission.CLASS_REGISTER"),
                                  filterUser = new PermissionFilterModel("user", "filter.permission.USER"),
                                  filterGroup = new PermissionFilterModel("group", "filter.permission.GROUP"),
                                  filterPermission = new PermissionFilterModel("permission", "filter.permission.PERMISSION");
            #endregion

            var list = new List<PermissionModel>
            {
                new PermissionModel
                {
                    Id = Claim.Aluno_List,
                    Name="app.aluno.list",
                    DisplayName="header.LIST_STUDENT",
                    Filter = filterStudent
                },
                   #region ...

                new PermissionModel
                {
                    Id = Claim.Aluno_Details,
                    Name="app.aluno.details",
                    DisplayName="header.EDIT_STUDENT",
                    Filter = filterStudent
                },
                new PermissionModel
                {
                    Id = Claim.Aluno_Create,
                    Name="app.aluno.create",
                    DisplayName="header.CREATE_STUDENT",
                    Filter = filterStudent
                },

                new PermissionModel
                {
                    Id = Claim.Aula_List,
                    Name="app.aula.list",
                    DisplayName="header.LIST_LESSON",
                    Filter = filterLesson
                },

                new PermissionModel
                {
                    Id = Claim.Aula_Create,
                    Name="app.aula.create",
                    DisplayName="header.CREATE_LESSON",
                    Filter = filterLesson
                },

                new PermissionModel
                {
                    Id = Claim.Chamada_Create,
                    Name="app.chamada",
                    DisplayName="header.CLASS_REGISTER",
                    Filter = filterClassRegister
                },

                new PermissionModel
                {
                    Id = Claim.Manager_User_List,
                    Name="app.user.list",
                    DisplayName="header.LIST_USERS",
                    Filter = filterUser
                },


                new PermissionModel
                {
                    Id = Claim.Manager_User_Edit,
                    Name="app.user.edit",
                    DisplayName="header.CREATE_USERS",
                    Filter = filterUser
                },

                new PermissionModel
                {
                    Id = Claim.Manager_User_Group_Edit,
                    Name="app.user.groupEdit",
                    DisplayName="header.EDIT_USERS_GROUP",
                    Filter = filterUser
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_List,
                    Name="app.group.list",
                    DisplayName="header.LIST_GROUPS",
                    Filter = filterGroup
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Create,
                    Name="app.group.create",
                    DisplayName="header.CREATE_GROUPS",
                    Filter = filterGroup
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Edit,
                    Name="app.group.edit",
                    DisplayName="header.EDIT_GROUPS",
                    Filter = filterGroup
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Group_Permission_Edit,
                    Name="app.group.permissionsEdit",
                    DisplayName="header.EDIT_GROUPS_PERMISSIONS",
                    Filter = filterGroup
                },

                new PermissionModel
                {
                    Id = Claim.Manager_Permission_List,
                    Name= "app.permission",
                    DisplayName="header.LIST_PERMISSIONS",
                    Filter = filterPermission
                },

                new PermissionModel
                {
                    Id = Claim.Turma_List,
                    Name= "app.turma.list",
                    DisplayName="header.LIST_CLASS",
                    Filter = filterClass
                },

                new PermissionModel
                {
                    Id = Claim.Turma_Create,
                    Name= "app.turma.create",
                    DisplayName="header.CREATE_CLASS",
                    Filter = filterClass
                },


                new PermissionModel
                {
                    Id = Claim.Turma_Details,
                    Name= "app.turma.details",
                    DisplayName="header.EDIT_CLASS",
                    Filter = filterClass
                },

                new PermissionModel
                {
                    Id = Claim.Custon_Excluir_Aluno,
                    Name= "action.deleteAluno",
                    DisplayName="header.REMOVE_STUDENT",
                    Filter = filterCustom
                },
                new PermissionModel
                {
                    Id = Claim.Custon_Delete_Turma,
                    Name= "action.deleteTurma",
                    DisplayName="header.REMOVE_CLASS",
                    Filter = filterCustom
                },
            #endregion
            };
            list.ForEach((x) => { x.Id = x.Id.Split('.')[1]; });
            return list;
        }

    }
}