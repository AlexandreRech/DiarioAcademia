namespace NDDigital.DiarioAcademia.WebApi.Filters
{
    public static class PermissionSpec
    {
        #region Aluno

        public const string Aluno = ".02"
            +  Aluno_List
            + Aluno_Details
            + Aluno_Create;

        public const string Aluno_List = ".03";
        public const string Aluno_Details = ".04";
        public const string Aluno_Create = ".05";

        #endregion Aluno

        #region Aula

        public const string Aula = ".06"
            + Aula_List
            + Aula_Create;

        public const string Aula_List = ".07";
        public const string Aula_Create = ".08";

        #endregion Aula

        #region Chamada

        public const string Chamada =
              Chamada_Create;

        public const string Chamada_Create = ".11";

        #endregion Chamada

        #region Manager

        public const string Manager = ".12"
            + Manager_User
            + Manager_Group
            + Manager_Permission;

        #region User

        public const string Manager_User = ".13"
            + Manager_User_List
            + Manager_User_Edit
            + Manager_User_Group_Edit;

        public const string Manager_User_List = ".14";
        public const string Manager_User_Edit = ".15";
        public const string Manager_User_Group_Edit = ".16";

        #endregion User

        #region Group

        public const string Manager_Group = ".17"
            + Manager_Group_List
            + Manager_Group_Create
            + Manager_Group_Edit
            + Manager_Group_Permission_Edit;

        public const string Manager_Group_List = ".18";
        public const string Manager_Group_Create = ".19";
        public const string Manager_Group_Edit = ".20";
        public const string Manager_Group_Permission_Edit = ".21";

        #endregion Group

        #region Permissions

        public const string Manager_Permission =
            Manager_Permission_List;

        public const string Manager_Permission_List = ".22";

        #endregion Group

        #endregion Manager

        #region Turma

        public const string Turma = ".23"
            + Turma_List
            + Turma_Details
            + Turma_Create;

        public const string Turma_List = ".24";
        public const string Turma_Details = ".25";
        public const string Turma_Create = ".26";

        #endregion Turma

        #region Custom

        public const string Custom =
              Custon_Excluir_Aluno
            + Custon_Delete_Turma;

        public const string Custon_Excluir_Aluno = ".27";
        public const string Custon_Delete_Turma = ".28";

        #endregion Custom
    }
}