using FizzWare.NBuilder;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Dominio.Entities.Security;
using System;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.IntegrationTests.Base
{
    public class ObjectBuilder
    {

        static int _index = 0;
        static bool _admin = false;
        static string Index { get { return (++_index).ToString(); } }
        // public static void Reset() => _index = 0; todo: C# 6


        public static void Reset() {
            _index = 0;
        }

        public static Turma CreateTurma()
        {
            return Builder<Turma>.CreateNew()
            .WithConstructor(() =>
            new Turma(2014)).Build();
        }

        public static Aluno CreateAluno(Turma turma)
        {
            return Builder<Aluno>.CreateNew()
            .WithConstructor(() =>
            new Aluno("Thiago Sartor", turma)).Build();
        }

        private static Endereco CreateEndereco()
        {
            return Builder<Endereco>.CreateNew()
            .WithConstructor(() =>
            new Endereco("88509720",
            "Ferrovia",
            "Lages",
            "SC")).Build();
        }

        public static Aula CreateAula(Turma turma)
        {
            return Builder<Aula>.CreateNew()
            .WithConstructor(() =>
            new Aula(DateTime.Now, turma)).Build();
        }

        public static User CreateUser(bool full = true)
        {
            var names = new[] { "joao", "jose", "pedro", "mariah", "sabrina" };

            var user = new User { FirstName = names[_index % 5], LastName = "da silva" };

            user.Account = CreateAccount(full);

            user.UserName = user.Account.Username;

            return user;
        }
        public static Account CreateAccount(bool full = true)
        {
            var username = "username " + Index;

            return (full)
                ? new Account(username) { Groups = CreateListGroups() }
                : new Account(username);
        }
        public static Group CreateGroup(bool full = true)
        {
            var group = new Group { Name = "Grupo " + Index, IsAdmin = _admin = !_admin };

            if (full) group.Permissions = CreateListPermissions();

            return group;
        }



        public static List<Group> CreateListGroups(int count = 2)
        {
            var list = new List<Group>();

            for (int i = 0; i < count; i += 1)
                list.Add(CreateGroup(true));

            return list;
        }
        public static Permission CreatePermission()
        {
            return new Permission(Index);
        }

        public static List<Permission> CreateListPermissions(int count = 2)
        {
            var list = new List<Permission>();

            for (int i = 0; i < count; i += 1)
                list.Add(CreatePermission());

            return list;
        }

    }
}