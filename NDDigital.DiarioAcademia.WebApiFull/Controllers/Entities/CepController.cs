using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.CepServices;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Entities
{
    public class CepController : ApiController
    {
        // GET: api/Cep/5
        public Endereco Get(string id)
        {
            var _webService = new CepWebService();

            return _webService.PreencheEndereco(id);
        }
    }
}