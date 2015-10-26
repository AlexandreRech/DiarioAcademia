using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Dominio.Entities;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.OData;
using System.Web.OData.Query;
using System.Web.OData.Routing;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.OData
{
    [ODataRoutePrefix("Aluno")]
    public class AlunosController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();

        private AlunoService _alunoService;
        private IAlunoRepository AlunoRepository;
        private ITurmaRepository TurmaRepository;
        private IUnitOfWork Uow;

        public AlunosController()
        {
            AlunoRepository = Injection.Get<IAlunoRepository>();
            TurmaRepository = Injection.Get<ITurmaRepository>();
            Uow = Injection.Get<IUnitOfWork>();

            _alunoService = new AlunoService(AlunoRepository, TurmaRepository, Uow);
        }

        // GET: odata/Alunos
        [EnableQuery]        
        public IQueryable<Aluno> GetAlunos()
        {
            return _alunoService.GetAlunos();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}