﻿using NDDigital.DiarioAcademia.Dominio.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NDDigital.DiarioAcademia.Infraestrutura.Security.Entities
{
    public class Account : Entity
    {
        public Account()
        {
        }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        public virtual List<Group> Groups { get; set; }

        public Account(string username)
        {
            Username = username;
        }
        public override string ToString()
        {
            return Username;
        }
    }
}