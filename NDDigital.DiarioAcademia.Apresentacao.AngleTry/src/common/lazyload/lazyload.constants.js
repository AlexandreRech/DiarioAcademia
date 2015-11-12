(function () {
    'use strict';

    var root = 'src/';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': [root + 'vendor/modernizr/modernizr.js'],
                'icons': [root + 'vendor/fontawesome/css/font-awesome.min.css',
                          root + 'vendor/simple-line-icons/css/simple-line-icons.css']
            },
            // Angular based script
            modules: [
               {
                   name: 'app.turma',
                   files: [root + 'features/turma/controllers/turma-list.controller.js',
                           root + 'features/turma/controllers/turma-details.controller.js',
                           root + 'features/turma/controllers/turma-create.controller.js']
               }, {
                   name: 'app.aluno',
                   files: [root + 'features/aluno/controllers/aluno-list.controller.js',
                            root + 'features/aluno/controllers/aluno-details.controller.js',
                            root + 'features/aluno/controllers/aluno-create.controller.js']

               }, {
                   name: 'app.aula',
                   files: [root + 'features/aula/controllers/aula-list.controller.js',
                             root + 'features/aula/controllers/aula-create.controller.js']

               }, {
                   name: 'app.chamada',
                   files: [root + 'features/chamada/chamada.controller.js']
               }, {
                   name: 'app.auth',
                   files: [root + 'features/authentication/controllers/login.controller.js',
                           root + 'features/authentication/controllers/signup.controller.js']
               }, {
                   name: 'app.user',
                   files: [root + 'features/user/controllers/manager-user-list.controller.js',
                           root + 'features/user/controllers/manager-user-edit.controller.js',
                           root + 'features/user/controllers/manager-user-edit-group.controller.js']
               }, {
                   name: 'app.permission',
                   files: [root + 'features/permission/manager-permission.controller.js']
               }, {
                   name: 'app.group',
                   files: [root + 'features/group/controllers/manager-group-list.controller.js',
                           root + 'features/group/controllers/manager-group-create.controller.js',
                           root + 'features/group/controllers/manager-group-edit.controller.js',
                           root + 'features/group/controllers/manager-group-permission-edit.controller.js',
                           root + 'features/group/controllers/manager-group-permission-edit.controller.js']
               }]
        });
})();
