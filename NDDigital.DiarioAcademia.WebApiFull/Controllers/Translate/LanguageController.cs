using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Translate
{
    public class LanguageController : ApiController
    {
        public IEnumerable<Pair> Get(int id)
        {
            var language = ((Language)id).EnumToString();

            var path = HttpContext.Current.Server.MapPath("~/translate/" + language + ".txt");

            var pairs = File.ReadAllLines(path);

            foreach (var pair in pairs)
            {
                if (String.IsNullOrWhiteSpace(pair) ||
                    pair.Substring(0, 2).Equals("--"))
                    continue;

                var split = pair.Split('=');
                yield return new Pair { Key = split[0], Value = split[1] };
            }
        }

        public class Pair
        {
            public string Key { get; set; }
            public string Value { get; set; }
        }

        public enum Language
        {
            [Description("en-us")]
            English = 1,

            [Description("pt-br")]
            Portuguese = 2,

            [Description("es-es")]
            Spanish = 3
        }
    }

    public static class EnumExtension
    {
        public static string EnumToString(this System.Enum value)
        {
            DescriptionAttribute[] descriptionAttributeArray = (DescriptionAttribute[])value.GetType().GetField(((object)value).ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false);
            if (descriptionAttributeArray.Length > 0)
                return Enumerable.First(descriptionAttributeArray).Description;
            else
                return ((object)value).ToString();
        }
    }
}