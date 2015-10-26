using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Collections.Generic;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Entities
{
    [GrouperAuthorize(Claim.Aula)]
    public class AulaController : BaseEntityController
    {
        private AulaService _aulaService;

        public AulaController()
        {
            _aulaService = new AulaService(AulaRepository, AlunoRepository, TurmaRepository, Uow);
        }

        // GET: api/Aula
        public IEnumerable<AulaDTO> Get()
        {
            return _aulaService.GetAll();
        }

        // GET: api/Aula/5
        public AulaDTO Get(int id)
        {
            return _aulaService.GetById(id);
        }

        // POST: api/Aula
        public void Post([FromBody]AulaDTO value)
        {
            _aulaService.Add(value);
        }

        // PUT: api/Aula/5
        public void Put(int id, [FromBody]AulaDTO value)
        {
        }

        // DELETE: api/Aula/5
        public void Delete(int id)
        {
            _aulaService.Delete(id);
        }
    }
}