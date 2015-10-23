(function () {

    "use strict";
    //using
    alunoDetailsController.$inject = ["alunoService", "turmaService", "$stateParams", "$state", "$scope", "cepService"];

    //namespace
    angular
        .module("app.aluno")
        .controller("alunoDetailsController", alunoDetailsController);

    //class
    function alunoDetailsController(alunoService, turmaService, params, $state, $scope, cepService) {
        var vm = this;
        vm.title = "Atualização de Alunos";
        vm.aluno = { endereco: { cep: "" } }; //Graças ao DTO tive que inicializar com um CEP para o serviço funcionar
        vm.turmas = [];

        //script load
        activate();

        function activate() {

            turmaService.getTurmas()
                .then(function (dataTurmas) {

                    alunoService.getAlunoById(params.alunoId)
                        .then(function (resultsAluno) {

                            vm.turmas = dataTurmas;
                            vm.aluno = convertDtoToAluno(resultsAluno);
                        });
                });
        }

        //public methods
        vm.save = function () {
            alunoService.edit(convertDto(vm.aluno)).then(function () {
                $state.go('aluno.list');
            });
            vm.clearFields();
        };

        vm.clearFields = function () {
            vm.aluno = {};
            vm.aluno = { endereco: { cep: "" } };
            vm.alunoForm.$setPristine();
        }

        $scope.$watch(angular.bind(this, function () {
            if (vm.aluno.endereco)
                return vm.aluno.endereco.cep;
            return vm.aluno.cep;
        }), function (newVal) {
            if (newVal) {
                cepService.getEndereco(newVal).then(function (result) {
                    vm.aluno.endereco.bairro = result.bairro;
                    vm.aluno.endereco.localidade = result.localidade;
                    vm.aluno.endereco.uf = result.uf;
                });
            }
        });

        //private methods
        function convertDto(aluno) {
            return {
                id: aluno.id,
                turmaId: aluno.turma.id,
                descricao: aluno.nome + ": Presenças: 0, Faltas: 0 ",
                cep: aluno.endereco.cep,
                bairro: aluno.endereco.bairro,
                localidade: aluno.endereco.localidade,
                uf: aluno.endereco.uf
            };
        }

        function getTurmaById(id) {
            for (var i = 0; i < vm.turmas.length; i++) {
                if (vm.turmas[i].id == id) {
                    return vm.turmas[i];
                }
            }
        }

        function convertDtoToAluno(alunoDto) {
            return {
                id: alunoDto.id,
                nome: alunoDto.nome.split(':')[0],
                turma: getTurmaById(alunoDto.turma.id),
                endereco: {
                    cep: alunoDto.endereco.cep,
                    bairro: alunoDto.endereco.bairro,
                    localidade: alunoDto.endereco.localidade,
                    uf: alunoDto.endereco.uf
                }
            };
        }

    }

})();