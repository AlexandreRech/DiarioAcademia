using NDDigital.DiarioAcademia.Dominio.Contracts;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.IoC;

namespace NDDigital.DiarioAcademia.WebApiFull.Controllers.Base
{
    public class BaseEntityController : BaseApiController
    {
        protected IAulaRepository AulaRepository;
        protected IAlunoRepository AlunoRepository;
        protected ITurmaRepository TurmaRepository;

        public BaseEntityController()
        {
            AulaRepository = Injection.Get<IAulaRepository>();
            AlunoRepository = Injection.Get<IAlunoRepository>();
            TurmaRepository = Injection.Get<ITurmaRepository>();

            Uow = Injection.Get<IUnitOfWork>();
        }
    }
}