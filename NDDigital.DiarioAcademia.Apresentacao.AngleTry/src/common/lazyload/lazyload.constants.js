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
                   routes: ['app.turma.list', 'app.turma.details', 'app.turma.create'],
                   files: [root + 'features/turma/turma.module.js',
                                              root + 'features/turma/turma.routes.js',
                                              root + 'features/turma/turma.service.js',
                                              root + 'features/turma/controllers/turma-list.controller.js',
                                              root + 'features/turma/controllers/turma-details.controller.js',
                                              root + 'features/turma/controllers/turma-create.controller.js']
               }, {
                   name: 'app.aluno',
                   routes: ['app.aluno.list', 'app.aluno.details', 'app.aluno.create'],
                   files: [root + 'features/aluno/aluno.module.js',
                             root + 'features/aluno/aluno.routes.js',
                             root + 'features/aluno/aluno.service.js',
                             root + 'features/aluno/aluno.adapter.js',
                             root + 'features/aluno/controllers/aluno-list.controller.js',
                             root + 'features/aluno/controllers/aluno-details.controller.js',
                             root + 'features/aluno/controllers/aluno-create.controller.js']

               }, {
                   name: 'app.aula',
                   routes: ['app.aula.list', 'app.aula.create'],
                   files: [root + 'features/aula/aula.module.js',
                             root + 'features/aula/aula.routes.js',
                             root + 'features/aula/aula.service.js',
                             root + 'features/aula/controllers/aula-list.controller.js',
                             root + 'features/aula/controllers/aula-create.controller.js']

               }, {
                   name: 'app.chamada',
                   routes: ['app.chamada'],
                   files: [root + 'features/chamada/chamada.module.js',
                             root + 'features/chamada/chamada.routes.js',
                             root + 'features/chamada/chamada.adapter.js',
                             root + 'features/chamada/chamada.service.js',
                             root + 'features/chamada/chamada.controller.js']
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
               } ]
        });
})();
