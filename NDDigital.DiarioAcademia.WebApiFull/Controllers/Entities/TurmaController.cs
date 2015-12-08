using NDDigital.DiarioAcademia.Aplicacao.DTOs;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.WebApiFull.Controllers.Base;
using NDDigital.DiarioAcademia.WebApiFull.Filters;
using System.Collections.Generic;
using System.Web.Http;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Entities
{
    [GrouperAuthorize(PermissionSpec.Turma)]
    public class TurmaController : BaseEntityController
    {
        private  readonly ITurmaService _turmaService;

        public TurmaController()
        {
            _turmaService = new TurmaService(TurmaRepository, Uow);
        }

        // GET: api/Turma
        public IEnumerable<TurmaDTO> Get()
        {
            return _turmaService.GetAll();
        }

        // GET: api/Turma/5
        public TurmaDTO Get(int id)
        {
            return _turmaService.GetById(id);
        }

        // POST: api/Turma
        public IHttpActionResult Post([FromBody]TurmaDTO value)
        {
            _turmaService.Add(value);
            return Ok();
        }

        // PUT: api/Turma/5
        public IHttpActionResult Put(int id, [FromBody]TurmaDTO value)
        {
            value.Id = id;
            _turmaService.Update(value);

            return Ok();
        }

        // DELETE: api/Turma/5
        [GrouperAuthorize(PermissionSpec.Turma_Delete)]
        public IHttpActionResult Delete(int id)
        {
            _turmaService.Delete(id);
            return Ok();
        }
    }
}