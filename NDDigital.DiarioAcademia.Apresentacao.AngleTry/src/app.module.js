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
            //common
            'app.core',
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
            //diretives
            'app.nddtable',
            'app.nddhead',
            'app.nddtoolbar',
            'app.modal',
            'app.checkbox',
            'app.ndd-confirm-exit',
            'app.ndd-security',
            //features
            'app.layout',
            'app.auth',
            'app.user',
            'app.group',
            'app.permission',
            'app.routes.config',
        ]);
})();

