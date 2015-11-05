using AutoMapper;

namespace NDDigital.DiarioAcademia.Aplicacao.Profiles

{
    public static class AutoMapperConfig
    {
        public static void ConfigMappers()
        {
            Mapper.Initialize(map =>
            {
                map.AddProfile(new TurmaProfiles());
                map.AddProfile(new AlunoProfiles());
                map.AddProfile(new AulaProfiles());
            });
        }
    }
}