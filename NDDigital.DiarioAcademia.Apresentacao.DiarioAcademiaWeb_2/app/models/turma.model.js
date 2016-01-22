var DiarioAcademia = DiarioAcademia || {};
(function (ns) {

    ns.Turma = function (ano, descricao) {
        this.id = ++ns.Turma.id;
        this.ano = ano;
        this.descricao = descricao;
    };
    ns.Turma.id = 0;

})(DiarioAcademia);