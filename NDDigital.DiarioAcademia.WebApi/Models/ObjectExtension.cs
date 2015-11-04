using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace NDDigital.Extensions
{
    public static class ObjectExtension
    {
        /// <summary>
        /// Generate a serialized string in xml from any not-static object
        /// Gera uma string serializada em xml de qualquer objeto não estático.
        /// </summary>
        /// <param name="obj"></param>
        /// <returns>String in XML format</returns>
        public static string Serialize(this object obj)
        {
            StringBuilder sb = new StringBuilder();
            using (XmlWriter writer = XmlWriter.Create(sb))
            {
                XmlSerializer serializer = new XmlSerializer(obj.GetType());
                serializer.Serialize(writer, obj);
            }

            return sb.ToString();
        }
        /// <summary>
        /// Converts a xml string to object
        /// Converte uma string em xml para objeto
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static T Deserialize<T>(this string obj)
        {
            using (XmlReader reader = XmlReader.Create(new StringReader(obj)))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(T));
                return (T)serializer.Deserialize(reader);
            }
        }

        public static T to<T>(this string xmlObject) where T : class
        {
            return Deserialize<T>(xmlObject);
        }
    }
}