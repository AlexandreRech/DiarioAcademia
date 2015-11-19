using NDDigital.DiarioAcademia.Dominio.Entities;
using System.Net;
using System.Xml.Linq;

namespace NDDigital.DiarioAcademia.Infraestrutura.CepServices
{
    public class CepWebService
    {
        private const string WebserviceUrl = "http://viacep.com.br/ws/@cep/@format/";

        public Endereco PreencheEndereco(string cep, string format = "xml")
        {
            try
            {
                var url = WebserviceUrl
                                .Replace("@cep", cep)
                                .Replace("@format", format);
                var xml = XElement.Load(url);

                var endereco = new Endereco();

                if (xml.Element("erro") == null)
                {

                    endereco.Cep = xml.Element("cep").Value;
                    endereco.Bairro = xml.Element("bairro").Value;
                    endereco.Localidade = xml.Element("localidade").Value;
                    endereco.Uf = xml.Element("uf").Value;
                }
                return endereco;
            }
            catch (WebException ex) {
                return null;
            }
        }
    }
}