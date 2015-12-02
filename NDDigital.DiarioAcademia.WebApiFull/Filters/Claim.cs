namespace NDDigital.DiarioAcademia.WebApiFull.Filters
{
    public static class Claim
    {
        #region Aluno

        public const string Aluno = ".ALUNO"
            + Aluno_Get
            + Aluno_Post
            + Aluno_Put
            + Aluno_Delete;

        public const string Aluno_Get= ".ALUNO_GET";
        public const string Aluno_Post= ".ALUNO_POST";
        public const string Aluno_Put = ".ALUNO_PUT";
        public const string Aluno_Delete = ".ALUNO_DELETE";

        #endregion Aluno

        #region Aula


        public const string Aula = ".AULA"
            + Aula_Get
            + Aula_Post
            + Aula_Put
            + Aula_Delete;

        public const string Aula_Get = ".AULA_GET";
        public const string Aula_Post = ".AULA_POST";
        public const string Aula_Put = ".AULA_PUT";
        public const string Aula_Delete = ".AULA_DELETE";

        #endregion Aula

        #region Chamada
        

        public const string Chamada = ".CHAMADA"
            + Chamada_Get
            + Chamada_Post
            + Chamada_Put
            + Chamada_Delete;

        public const string Chamada_Get = ".CHAMADA_GET";
        public const string Chamada_Post = ".CHAMADA_POST";
        public const string Chamada_Put = ".CHAMADA_PUT";
        public const string Chamada_Delete = ".CHAMADA_DELETE";


        #endregion Chamada

        #region Turma

        public const string Turma = ".TURMA"
            + Turma_Get
            + Turma_Post
            + Turma_Put
            + Turma_Delete;

        public const string Turma_Get = ".TURMA_GET";
        public const string Turma_Post = ".TURMA_POST";
        public const string Turma_Put = ".TURMA_PUT";
        public const string Turma_Delete = ".TURMA_DELETE";

        #endregion Turma

        #region Manager

        public const string Manager = ".MANAGER"
            + Account
            + Group
            + Permission;

        #region Account

        public const string Account = ".ACCOUNT"
            + Account_Get
            + Account_Create
            + Account_Edit
            + Account_Delete;

        public const string Account_Get = ".ACCOUNT_GET";
        public const string Account_Create = ".ACCOUNT_CREATE";
        public const string Account_Edit = ".ACCOUNT_PUT";
        public const string Account_Delete= ".ACCOUNT_DELETE";

        #endregion User

        #region Group

        public const string Group = ".GROUP"
        + Group_Get
        + Group_Post
        + Group_Put
        + Group_Delete;

        public const string Group_Get = ".GROUP_GET";
        public const string Group_Post = ".GROUP_POST";
        public const string Group_Put = ".GROUP_PUT";
        public const string Group_Delete = ".GROUP_DELETE";

        #endregion Group

        #region Permissions

        public const string Permission = ".PERMISSION"
         + Permission_Get
         + Permission_Post
         + Permission_Put
         + Permission_Delete;

        public const string Permission_Get = ".PERMISSION_GET";
        public const string Permission_Post = ".PERMISSION_POST";
        public const string Permission_Put = ".PERMISSION_PUT";
        public const string Permission_Delete = ".PERMISSION_DELETE";

        #endregion Permission

        #region Authorize

        public const string Authorize = ".AUTHORIZE"
           + Authorize_Groups_User
            + Authorize_Groups_User;

        public const string Authorize_Permissions_Group = ".AUTHORIZE_PERMISSIONs_GROUP";//add/remove permission from groups 
        public const string Authorize_Groups_User= ".AUTHORIZE_GROUPs_USER";//add/remove groups from user



        #endregion

        #endregion Manager

    }
}