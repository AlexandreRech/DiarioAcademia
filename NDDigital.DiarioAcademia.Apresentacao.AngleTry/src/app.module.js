/*!
 * 
 * DiarioAcademia: Diario da Academia do Programador
 * 
 * Version: 3.0.0
 * Author: PD&I - NDDigital
 * Website: https://github.com/AlexandreRech/DiarioAcademia
 * License: MIT
 * 
 */

// APP START
// ----------------------------------- 

(function () {
    'use strict';

    angular
        .module('diarioacademia', [
            //core
            'app.core',
            //components
            'app.nddtable',
            'app.nddhead',
            'app.nddtoolbar',
            'app.modal',
            'app.checkbox',
            'app.ndd-confirm',
            'app.ndd-security',
            //common
            'app.common',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.logger',
            'app.automapper',
            'app.changes',
            'datatables.directive',
            'datatables.factory',
            'app.cep',
            'app.layout',
             //security
            'app.authorization',
            'app.authentication',
            'app.permission',
            //features
            'app.user',
            'app.group',
            'app.aluno',
            'app.turma',
            'app.chamada',
            'app.aula'
        ]);
})();


