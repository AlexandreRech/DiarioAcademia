using NDDigital.DiarioAcademia.Infraestrutura.Security.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.Security.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Routing;

namespace NDDigital.DiarioAcademia.WebApiFull.Models
{
    public class ModelFactory
    {
        private UrlHelper _UrlHelper;
        private UserRepository _UserRepository;

        public ModelFactory(HttpRequestMessage request, UserRepository appUserManager)
        {
            _UrlHelper = new UrlHelper(request);
            _UserRepository = appUserManager;
        }

        public UserReturnModel Create(User appUser)
        {
            return new UserReturnModel
            {
                Url = _UrlHelper.Link("GetUserById", new { id = appUser.Id }),
                Id = appUser.Id,
                UserName = appUser.UserName,
                FullName = string.Format("{0} {1}", appUser.FirstName, appUser.LastName),
                Email = appUser.Email,
            };
        }

        public GroupReturnModel Create(Group appGroup)
        {
            return new GroupReturnModel()
            {
                Id = appGroup.Id,
                Name = appGroup.Name,
                IsAdmin = appGroup.IsAdmin,
                Claims = appGroup.Claims.Select(a => a.Name).Distinct().ToArray()
            };
        }
    }
}