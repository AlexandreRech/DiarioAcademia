using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Entities
{
    [GrouperAuthorize(PermissionSpec.Chamada)]
    public class ChamadaController : BaseEntityController
    {
        private AulaService _aulaService;

        public ChamadaController()
        {
            _aulaService = new AulaService(AulaRepository, AlunoRepository, TurmaRepository, Uow);
        }

        // GET: api/Chamada
        public ChamadaDTO Get(int id)
        {
            var aulaDto = _aulaService.GetById(id);
            return _aulaService.GetChamadaByAula(aulaDto);
        }

        // POST: api/Chamada
        public void Post([FromBody]ChamadaDTO value)
        {
            _aulaService.RealizaChamada(value);
        }

        // PUT: api/Chamada/5
        public void Put(int id, [FromBody] ChamadaDTO value)
        {
        }

        // DELETE: api/Chamada/5
        public void Delete(int id)
        {
        }
    }
}