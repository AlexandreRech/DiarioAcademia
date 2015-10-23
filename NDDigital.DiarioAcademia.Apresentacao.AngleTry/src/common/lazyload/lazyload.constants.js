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

            // Angular based script (use the right module name)
            modules: [
               // Authentication
               { name: 'loginController', files: [root + 'features/authentication/controllers/login.controller.js'] },
               { name: 'signupController', files: [root + 'features/authentication/controllers/signup.controller.js'] },
               //Class
               { name: 'turmaListController', files: [root + 'features/turma/controllers/turma-list.controller.js'] },
               { name: 'turmaDetailsController', files: [root + 'features/turma/controllers/turma-details.controller.js'] },
               { name: 'turmaCreateController', files: [root + 'features/turma/controllers/turma-create.controller.js'] },
               //Student
               { name: 'alunoListController', files: [root + 'features/aluno/controllers/aluno-list.controller.js'] },
               { name: 'alunoDetailsController', files: [root + 'features/aluno/controllers/aluno-details.controller.js'] },
               { name: 'alunoCreateController', files: [root + 'features/aluno/controllers/aluno-create.controller.js'] },
               //Lesson
               { name: 'aulaListController', files: [root + 'features/aula/controllers/aula-list.controller.js'] },
               { name: 'aulaCreateController', files: [root + 'features/aula/controllers/aula-create.controller.js'] },
               //Class Register
               { name: 'chamadaController', files: [root + 'features/chamada/chamada.controller.js'] },
               //User
               { name: 'managerUserListController', files: [root + 'features/user/controllers/manager-user-list.controller.js'] },
               { name: 'managerUserEditController', files: [root + 'features/user/controllers/manager-user-edit.controller.js'] },
               { name: 'managerUserEditGroupController', files: [root + 'features/user/controllers/manager-user-edit-group.controller.js'] },
               //Permissions
               { name: 'managerPermissionController', files: [root + 'features/permission/manager-permission.controller.js'] },
               // Group
               { name: 'managerGroupListController', files: [root + 'features/group/controllers/manager-group-list.controller.js'] },
               { name: 'managerGroupCreateController', files: [root + 'features/group/controllers/manager-group-create.controller.js'] },
               { name: 'managerGroupEditController', files: [root + 'features/group/controllers/manager-group-edit.controller.js'] },
               { name: 'managerGroupPermissionEditController', files: [root + 'features/group/controllers/manager-group-permission-edit.controller.js'] }
            ]
        });

})();
