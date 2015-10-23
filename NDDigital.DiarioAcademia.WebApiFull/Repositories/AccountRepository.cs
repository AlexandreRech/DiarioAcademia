using System;
using System.IO;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Linq;

namespace NDDigital.DiarioAcademia.WebApiFull.Repositories
{
    public class AccountRepository
    {
        private static List<IdentityUser> _users;
        private static string filepath = "d:\\AccountStub.txt";
        public AccountRepository()
        {
            _users = new List<IdentityUser>();
            _users.AddRange(GetAccountStub());
        }
        private IEnumerable<IdentityUser> GetAccountStub()
        {

            if (!File.Exists(filepath))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(filepath))
                    sw.WriteLine("admin;admin");

            }


            var lines = File.ReadAllLines(filepath);



            foreach (var line in lines)
            {
                if (String.IsNullOrWhiteSpace(line)) continue;
                var data = line.Split(';');

                yield return new IdentityUser() { UserName = data[0], PasswordHash = data[1] };
            }

        }
        internal IdentityResult Create(IdentityUser user, string password)
        {
            if (_users.Any(c => c.UserName == user.UserName))
                return new IdentityResult("User Already Exists.");
            user.PasswordHash = password;
            AddUser(user);
            return new IdentityResult();

        }

        private void AddUser(IdentityUser user)
        {
            _users.Add(user);
            using (StreamWriter sw = File.AppendText(filepath))
                sw.WriteLine("\n{0};{1}", user.UserName, user.PasswordHash);

        }

        internal void Dispose()
        {
        }

        internal IdentityUser Find(string userName, string password)
        {
            return _users.FirstOrDefault(c =>
                c.UserName == userName && c.PasswordHash == password
                );
        }
    }
}