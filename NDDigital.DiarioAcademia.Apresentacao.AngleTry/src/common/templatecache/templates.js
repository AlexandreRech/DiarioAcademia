angular.module("diarioacademia").run(["$templateCache", function($templateCache) {$templateCache.put("./src/common/permission/permission-list.html","<ndd-head title=\"{{\'header.LIST_PERMISSIONS\' | translate}}\"></ndd-head><div class=container-user><div class=\"row clear-padding\"><div class=col-xs-12><br></div><button class=\"btn btn-danger\" ng-click=vm.modifyAll(false) ng-disabled=\"vm.showRoutes.length <= 0\"><i class=\"fa fa-minus-square-o\"></i> <span>{{\'action.CLEAN_ALL\' | translate}}</span></button> <button class=\"btn btn-info\" ng-click=vm.modifyAll(true) ng-disabled=\"vm.showRoutes.length == vm.allPermissions.length\"><i class=\"fa fa-check-square-o\"></i> <span>{{\'action.SELECT_ALL\' | translate}}</span></button> <button class=\"btn btn-success pull-right space-left\" ng-disabled=!vm.hasChange ng-click=vm.save()><i class=\"fa fa-save\"></i> <span>{{\'action.SAVE\' | translate}}</span></button></div><br><div class=row><hr><div class=\"col-md-4 clear-padding col-grid\" ng-repeat=\"filter in vm.filters\" ng-show=vm.permission[filter].length><div class=\"panel panel-primary text-center panel-fixed\" ng-class=\"{\'panel-success\': vm.verifyPanelSuccess(filter)}\"><div class=panel-heading><input type=checkbox class=pull-left ng-model=isAll ng-click=\"vm.modifyGroupPermissions(isAll, filter)\" ng-checked=vm.verifyPanelSuccess(filter)> <b class=text-capitalize>{{ (\'filter.permission.\' + filter) | translate}}</b></div><div class=panel-body><ndd-group-checkbox array=vm.permission[filter] compare=vm.showRoutes method=vm.compareState callback=vm.onchange></ndd-group-checkbox></div></div></div></div></div><ndd-confirm controller=vm title=\"{{\'confirm.CONFIRM_ACTION\' | translate}}\" title-success=\"{{\'status.COMPLETED\' | translate}}\" text-success=\"{{\'info.CHANGE_DISPOSAL\' | translate}}\" type-success=success close-oncancel=true text=\"{{\'info.CHANGE_NOT_SAVE\' | translate}}\" prop=hasChange><ndd-confirm></ndd-confirm></ndd-confirm>");
$templateCache.put("./src/components/ndd-group-checkbox/ndd-group-checkbox.html","<div class=\"input-group space-bottom\" ng-repeat=\"obj in elements\"><span class=input-group-addon ng-class=\"{\'border-success\': check(obj, compare, method)}\"><input type=checkbox ng-checked=\"check(obj, compare, method)\" ng-click=\"onclick(obj, compare, callback, method)\"></span> <input type=text class=\"cursor-pointer form-control\" value=\"{{ (obj.displayName | translate) || obj.name}}\" readonly ng-click=\"onclick(obj, compare, callback, method);\" ng-class=\"{\'border-success\': check(obj, compare, method), \'clear-border\': !!obj.permissionId}\"> <span class=\"cursor-pointer input-group-addon show-permissionId\" ng-show=obj.permissionId ng-click=\"onclick(obj, compare, callback, method);\" ng-class=\"{\'border-success\': check(obj, compare, method)}\"><small>{{obj.permissionId}}</small></span></div><pager total-items=countElements ng-model=currentPage ng-hide=\"array.length == 0 || array.length <= numPerPage\"></pager>");
$templateCache.put("./src/components/ndd-head/ndd-head.html","<h3>{{title}} <small></small></h3>");
$templateCache.put("./src/components/ndd-modal/ndd-modal.html","<div class=\"modal fade\" id={{target}} tabindex=-1 role=dialog aria-labelledby=myModalLabel aria-hidden=true><div class=\"modal-dialog modal-lg\" style=\"margin-top: 5%\"><div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button><h4 class=modal-title id=myModalLabel>{{label}}</h4></div><div class=modal-body><div ng-transclude></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" data-dismiss=modal ng-hide=info>{{\'action.CANCEL\' | translate}}</button> <button type=button class=\"btn btn-primary\" data-dismiss=modal ng-click=callback()>{{\'action.OK\' | translate}}</button></div></div></div></div>");
$templateCache.put("./src/components/ndd-table/ndd-table.html","<div class=\"panel panel-default\"><div class=panel-heading>{{title}}</div><div class=panel-body><div class=container-table><table ng-if=data.length datatable=ng class=\"table row-border hover\" datatable-setup><thead><tr><th ng-repeat=\"column in columns\"></th><th>&nbsp;</th></tr><tr><th ng-repeat=\"column in columns\">{{column}}</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat=\"entity in data\" ng-class=\"{\'actived-row\':selectedEntity == entity}\"><td ng-repeat=\"attribute in attrs\"><div ng-hide=isBool(entity[attribute])><span ng-hide=isNumber(entity[attribute])>{{entity[attribute] | date: \'dd/MM/yyyy\' }}</span> <span ng-show=isNumber(entity[attribute])>{{entity[attribute]}}</span></div><span class=\"glyphicon glyphicon-ok text-warning\" ng-show=\"isBool(entity[attribute]) && entity[attribute]\"></span> <span class=\"glyphicon glyphicon-minus\" ng-show=\"isBool(entity[attribute]) && !entity[attribute]\"></span></td><td class=text-center><button type=button ng-click=cbEdit(entity) ng-if=cbEdit ndd-security={{securityEdit}} class=\"btn btn-sm btn-warning\"><em class=\"fa fa-edit\"></em></button> <button type=button ng-click=cbRemove(entity) ng-if=cbRemove ndd-security={{securityRemove}} class=\"btn btn-sm btn-danger\"><em class=\"fa fa-trash-o\"></em></button></td></tr></tbody></table></div></div></div>");
$templateCache.put("./src/components/ndd-toolbar/ndd-toolbar-option.html","<li class=li ndd-security={{security}}><a class=cursor-pointer ng-click=redirect(route)><i class=\"fa icon-font\" ng-class=icon ng-show=icon></i> <span class=\"align-middle visible-lg text-toolbar\">{{name}}</span></a></li>");
$templateCache.put("./src/components/ndd-toolbar/ndd-toolbar.html","<ul class=\"nav navbar-nav toolbar\"><ndd-toolbar-option name=Propriedades icon=fa-cog ng-click=cbProperties() ng-show=cbProperties security={{securityProperties}}></ndd-toolbar-option><ndd-toolbar-option name=Novo icon=fa-plus ng-click=cbNew() route={{stateNew}} ng-show=\"cbNew || stateNew\" security={{stateNew}}></ndd-toolbar-option><ndd-toolbar-option name=Remover icon=fa-times ng-click=cbRemove() security={{securityRemove}}></ndd-toolbar-option></ul>");
$templateCache.put("./src/features/chamada/chamada.html","<ndd-head title=\"{{\'entities.CLASS_REGISTER\' | translate}}\"></ndd-head><div class=row><div class=\"col-xs-offset-1 col-xs-10\"><form name=vm.chamadaForm class=jumbotron><select class=form-control ng-model=vm.chamada.turma ng-options=\"turma.descricao for turma in vm.turmas\" ng-change=vm.populateAulas(vm.chamada.turma) ng-disabled=!vm.turmas.length ng-required=true ng-selected=\"vm.selected == true\"><option value>Selecione a Turma</option></select><br><select class=form-control ng-model=vm.chamada.aula ng-options=\"aula.dataAula | date: \'dd/MM/yyyy\' for aula in vm.aulas\" ng-disabled=!vm.aulas.length ng-change=vm.getChamada() ng-required=true><option value>Selecione a aula</option></select><br><span class=\"btn alert-success notify-status\" ng-class=\"{\'alert-success\': vm.chamadaDto.chamadaRealizada, \'alert-danger\': !vm.chamadaDto.chamadaRealizada}\" ng-show=vm.aulaSelected><i class=\"fa fa-check\"></i> <span>{{ vm.chamadaDto.chamadaRealizada ? (\'status.CLASS_REGISTER_CREATE\' | translate) : (\'status.CLASS_REGISTER_NOT_CREATE\' | translate)}}</span></span> <button class=\"btn btn-success pull-right\" ng-click=vm.save() ng-disabled=vm.chamadaForm.$invalid>{{\'action.CREATE_CLASS_REGISTER\' | translate}}</button></form></div><div class=\"col-xs-offset-1 col-xs-10\"><div ng-show=\"vm.chamadaForm.aula.$error.required && vm.chamadaForm.aula.$dirty\" class=\"alert alert-danger\">Por favor, selecione aula de hoje!</div><div ng-show=\"vm.turmaSelected && vm.aulas.length == 0\" class=\"alert alert-danger\">Essa turma não possui aulas cadastradas!</div><div ng-show=\"vm.turmaSelected && vm.aulaSelected && vm.talunos.length == 0\" class=\"alert alert-danger\">Essa turma não possui alunos cadastrados!</div></div><table class=\"table table-hover table-responsive table-condensed\"><thead><tr><th>Presença</th><th>Alunos</th></tr></thead><tbody><tr ng-repeat=\"aluno in vm.alunos\"><td style=\"padding-left: 0; width: 150px\"><div class=switcher ng-class=\"{\'on\': aluno.status}\" ng-click=\"aluno.status = !aluno.status\"><div class=switcherHandler></div><input type=checkbox class=switcherInput ng-model=aluno.status></div></td><td><h4>{{aluno.nome}}</h4></td></tr></tbody></table></div>");
$templateCache.put("./src/common/authentication/views/login.html","<div class=\"abs-center wd-xl\"><div class=p><img ng-src=src/images/avatar_login.png alt=Avatar width=60 height=60 class=\"img-thumbnail img-circle center-block\"></div><div class=\"panel widget b0\"><div class=panel-body><p class=text-center>Please login to get started.</p><form role=form name=lockForm><div class=\"form-group has-feedback\"><input type=text name=inputEmail class=form-control placeholder=Username required autofocus ng-model=vm.loginData.userName> <span ng-show=\"lockForm.lock_password.$dirty &amp;&amp; lockForm.lock_password.$error.required\" class=text-danger>This field is required</span></div><div class=\"form-group has-feedback\"><input id=exampleInputPassword1 type=password placeholder=Password name=inputPassword required ng-model=vm.loginData.password class=form-control> <span class=\"fa fa-lock form-control-feedback text-muted\"></span> <span ng-show=\"lockForm.lock_password.$dirty &amp;&amp; lockForm.lock_password.$error.required\" class=text-danger>This field is required</span></div><div class=clearfix><div class=\"pull-left mt-sm\"><a ui-sref=signup class=text-muted><small>Not Registred ? Join now</small></a></div><div class=pull-right><button type=button ng-click=vm.login() class=\"btn btn-sm btn-primary\">Login</button></div></div></form></div></div><div class=\"p-lg text-center\"><span>&copy;</span> <span ng-bind=app.year></span> <span>-</span> <span ng-bind=app.name></span><br><span ng-bind=app.description></span></div></div>");
$templateCache.put("./src/common/authentication/views/signup.html","<div class=\"block-center mt-xl wd-xl\"><div class=\"panel panel-dark panel-flat\"><div class=\"panel-heading text-center\"><a href=#><img src=src/images/logo.svg alt=Image class=\"block-center img-rounded\" style=\"width: 121px;height: 34px;\"></a></div><div class=panel-body><p class=text-center>SIGNUP TO GET INSTANT ACCESS.</p><form role=form name=reg.registerForm novalidate ng-submit=reg.register() class=\"form-validate mb-lg\"><div class=\"form-group has-feedback\"><label class=text-muted>First Name</label> <input type=text name=first_name class=form-control placeholder=\"First Name\" ng-model=vm.registration.firstName autocomplete=off required autofocus> <span class=\"fa fa-user form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.first_name.$dirty &amp;&amp; reg.registerForm.first_name.$error.required\" class=text-danger>This field is required</span> <span ng-show=\"reg.registerForm.first_name.$dirty &amp;&amp; reg.registerForm.first_name.$error.email\" class=text-danger>This field must be a valid first name</span></div><div class=\"form-group has-feedback\"><label class=text-muted>Last Name</label> <input type=text name=last_name class=form-control placeholder=\"Last Name\" ng-model=vm.registration.lastName autocomplete=off required> <span class=\"fa fa-user form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.last_name.$dirty &amp;&amp; reg.registerForm.last_name.$error.required\" class=text-danger>This field is required</span> <span ng-show=\"reg.registerForm.last_name.$dirty &amp;&amp; reg.registerForm.last_name.$error.email\" class=text-danger>This field must be a valid last name</span></div><div class=\"form-group has-feedback\"><label class=text-muted>Usermame</label> <input type=text name=username class=form-control placeholder=Username ng-model=vm.registration.userName required> <span class=\"fa fa-user form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.username.$dirty &amp;&amp; reg.registerForm.username.$error.required\" class=text-danger>This field is required</span> <span ng-show=\"reg.registerForm.username.$dirty &amp;&amp; reg.registerForm.username.$error.email\" class=text-danger>This field must be a valid username</span></div><div class=\"form-group has-feedback\"><label class=text-muted>Email</label> <input type=email name=email class=form-control placeholder=Email ng-model=vm.registration.email required> <span class=\"fa fa-user form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.email.$dirty &amp;&amp; reg.registerForm.email.$error.required\" class=text-danger>This field is required</span> <span ng-show=\"reg.registerForm.email.$dirty &amp;&amp; reg.registerForm.email.$error.email\" class=text-danger>This field must be a valid email</span></div><div class=\"form-group has-feedback\"><label class=text-muted>Password</label> <input id=id-password type=password name=account_password ng-model=vm.registration.password ng-pattern=\"/^[a-zA-Z0-9]{6,10}$/\" required class=form-control> <span class=\"fa fa-lock form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.account_password.$dirty &amp;&amp; reg.registerForm.account_password.$error.required\" class=text-danger>This field is required</span> <span ng-show=\"reg.registerForm.account_password.$dirty &amp;&amp; reg.registerForm.account_password.$error.pattern\" class=text-danger>Input should match \'a-zA-Z0-9\' and 6-10 length</span></div><div class=\"form-group has-feedback\"><label class=text-muted>Retype Password</label> <input type=password name=account_password_confirm ng-model=vm.registration.confirmPassword ui-validate=\"\'$value==vm.registration.password\'\" ui-validate-watch=\"\'password\'\" class=form-control> <span class=\"fa fa-lock form-control-feedback text-muted\"></span> <span ng-show=\"reg.registerForm.account_password_confirm.$dirty &amp;&amp; reg.registerForm.account_password_confirm.$error.validator\" class=text-danger>Password does Not match</span></div><div class=clearfix><div class=\"checkbox c-checkbox pull-left mt0\"><label><input type=checkbox required name=account_agreed ng-model=reg.account.agreed> <span class=\"fa fa-check\"></span>I agree with the <a href=#>terms</a></label></div></div><div ng-show=\"reg.registerForm.account_agreed.$dirty &amp;&amp; reg.registerForm.account_agreed.$error.required\" class=text-danger>You must agree the terms</div><button class=\"btn btn-block btn-primary mt-lg\" type=submit ng-click=vm.signUp() ng-disabled=\"reg.registerForm.$error.required || reg.registerForm.account_agreed.$error.required\">Create account</button></form><div data-ng-hide=\"vm.message == \'\'\" ng-class=\"(vm.savedSuccessfully) ? \'alert alert-success\' : \'alert alert-danger\'\">{{vm.message}}<br></div><div ng-show=reg.authMsg class=\"alert alert-danger text-center\">{{reg.authMsg}}<br></div><p class=\"pt-lg text-center\">Have an account?</p><a ui-sref=login class=\"btn btn-block btn-default\">Signup</a></div></div><div class=\"p-lg text-center\"><span>&copy;</span> <span ng-bind=app.year></span> <span>-</span> <span ng-bind=app.name></span><br><span ng-bind=app.description></span></div></div>");
$templateCache.put("./src/common/layout/views/app.html","<header ng-include=\"\'src/common/layout/views/partials/top-navbar.html\'\" class=topnavbar-wrapper></header><aside ng-include=\"\'src/components/sidebar/views/sidebar.html\'\" ng-controller=\"SidebarController as vm\" class=aside></aside><aside ng-include=\"\'src/components/sidebar/views/offsidebar.html\'\" class=offsidebar></aside><section><div ui-view autoscroll=false ng-class=app.viewAnimation class=content-wrapper></div></section><footer ng-include=\"\'src/common/layout/views/partials/footer.html\'\"></footer>");
$templateCache.put("./src/common/layout/views/home.html","<h3>{{ \'dashboard.APP_NAME\' | translate }}</h3><div class=row><div class=\"col-xs-12 text-center\"><h2 class=text-thin>{{ \'dashboard.WELCOME\' | translate:{ appName: app.name } }} !</h2><p>{{ \'home.MESSAGE_START\' | translate }}<br>{{ \'home.MESSAGE_DESCRIPTION\' | translate }}</p></div></div>");
$templateCache.put("./src/common/templates/components/inner-view.html","<div ui-view class=\"container-fluid inner-view\"></div>");
$templateCache.put("./src/common/templates/components/user-profile.html","<div class=\"col-xs-12 clear-padding\"><h3 style=\"margin-top: 0;\">Perfil</h3><hr style=\"margin-top: 2%\"></div><form name=vm.formUser><div class=\"col-xs-12 clear-padding space-bottom\"><div class=\"col-xs-6 clear-padding\"><label for=name>Nome</label> <input type=text ng-model=vm.user.firstName class=form-control id=name></div><div class=\"col-xs-6 clear-padding padding-left\"><label for=lastname>Sobrenome</label> <input type=text ng-model=vm.user.lastName class=form-control id=lastname></div></div><div class=\"col-xs-12 clear-padding space-bottom\"><label for=username>Username</label> <input type=text ng-model=vm.user.userName class=form-control id=username></div><div class=\"col-xs-12 clear-padding space-bottom\"><label for=email>Email</label> <input type=text ng-model=vm.user.email class=form-control id=email></div></form>");
$templateCache.put("./src/components/sidebar/views/offsidebar-tab1-config.html","<h3 class=\"text-center text-thin\">{{\'header.SETTINGS\' | translate}}</h3><div class=language><h4 class=text-thin>{{\'header.LANGUAGE\' | translate}}</h4><div class=lang-group><div ng-repeat=\"(localeId, langName) in language.available\"><div class=\"{{localeId}} language-button\" ng-class=\"{\'{{localeId}}-active\': language.selected == langName}\" ng-click=\"language.set(localeId, $event)\" )\"></div></div></div></div><br><div class=p><h4 class=text-thin>{{\'header.THEMES\' | translate}}</h4><div class=\"table-grid mb\"><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-a.css> <span class=icon-check></span> <span class=split><span class=\"color bg-info\"></span> <span class=\"color bg-info-light\"></span></span> <span class=\"color bg-white\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-b.css> <span class=icon-check></span> <span class=split><span class=\"color bg-green\"></span> <span class=\"color bg-green-light\"></span></span> <span class=\"color bg-white\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-c.css> <span class=icon-check></span> <span class=split><span class=\"color bg-purple\"></span> <span class=\"color bg-purple-light\"></span></span> <span class=\"color bg-white\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-d.css> <span class=icon-check></span> <span class=split><span class=\"color bg-danger\"></span> <span class=\"color bg-danger-light\"></span></span> <span class=\"color bg-white\"></span></label></div></div></div><div class=\"table-grid mb\"><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-e.css> <span class=icon-check></span> <span class=split><span class=\"color bg-info-dark\"></span> <span class=\"color bg-info\"></span></span> <span class=\"color bg-gray-dark\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-f.css> <span class=icon-check></span> <span class=split><span class=\"color bg-green-dark\"></span> <span class=\"color bg-green\"></span></span> <span class=\"color bg-gray-dark\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-g.css> <span class=icon-check></span> <span class=split><span class=\"color bg-purple-dark\"></span> <span class=\"color bg-purple\"></span></span> <span class=\"color bg-gray-dark\"></span></label></div></div><div class=\"col mb\"><div class=setting-color><label><input type=radio name=setting-theme ng-model=app.layout.theme value=src/content/css/theme/theme-h.css> <span class=icon-check></span> <span class=split><span class=\"color bg-danger-dark\"></span> <span class=\"color bg-danger\"></span></span> <span class=\"color bg-gray-dark\"></span></label></div></div></div></div>");
$templateCache.put("./src/components/sidebar/views/offsidebar-tab2-user.html","<h3 class=\"text-center text-thin\">{{\'header.USER_OPTIONS\' | translate}}</h3>");
$templateCache.put("./src/components/sidebar/views/offsidebar.html","<nav><tabset justified=true><tab><tab-heading><em class=\"icon-equalizer fa-lg\"></em></tab-heading><div ng-include=\"\'src/components/sidebar/views/offsidebar-tab1-config.html\'\"></div></tab><tab><tab-heading><em class=\"icon-user fa-lg\"></em></tab-heading><div><div ng-include=\"\'src/components/sidebar/views/offsidebar-tab2-user.html\'\"></div></div></tab></tabset></nav>");
$templateCache.put("./src/components/sidebar/views/sidebar.html","<script type=text/ng-template id=sidebar-renderer.html><span ng-if=\"item.heading\">{{(item.translate | translate) || item.text}}</span> <a ng-if=\"!item.heading\" ng-href=\"{{$state.href(item.sref, item.params)}}\" title=\"{{item.text}}\"> <div ng-if=\"item.alert\" ng-class=\"item.label || \'label label-success\'\" class=\"pull-right\">{{item.alert}}</div> <em ng-if=\"item.icon\" class=\"{{item.icon}}\"></em><span>{{(item.translate | translate) || item.text}}</span> </a> <ul ng-if=\"item.submenu\" collapse=\"isCollapse(pIndex)\" ng-init=\"addCollapse(pIndex, item)\" class=\"nav sidebar-subnav\"> <li class=\"sidebar-subnav-header\">{{(item.translate | translate) || item.text}}</li> <li ng-repeat=\"item in item.submenu\" ng-include=\"\'sidebar-renderer.html\'\" ng-class=\"getMenuItemPropClasses(item)\" ng-init=\"pIndex=(pIndex+\'-\'+$index); inSubmenu = true\" ng-click=\"toggleCollapse(pIndex)\"></li> </ul></script><div class=aside-inner><nav sidebar sidebar-anyclick-close class=sidebar><ul class=nav ng-controller=UserBlockController><li class=has-user-block><div collapse=userBlockVisible><div class=\"item user-block\"><div class=user-block-picture><div class=user-block-status><img ng-src=src/images/avatar_login.png alt=Avatar class=\"img-thumbnail img-circle\"><div class=\"circle circle-success circle-lg\"></div></div></div><div class=user-block-info><span class=user-block-name>{{user.userName}}</span> <span class=user-block-role>{{user.fullName}}</span></div></div></div></li><li ng-class=getMenuItemPropClasses(item) ng-repeat=\"item in menuItems\" ng-init=\"pIndex = $index\" ng-include=\"\'sidebar-renderer.html\'\" ng-click=\"toggleCollapse(pIndex, true)\"></li></ul></nav></div>");
$templateCache.put("./src/features/aluno/views/aluno-create.html","<ndd-head title=\"{{\'header.CREATE_STUDENT\' | translate}}\"></ndd-head><div class=\"container-view padding-left\"><div class=\"col-sm-12 clear-padding\"><form name=vm.alunoForm class=jumbotron><input class=form-control type=text ng-model=vm.aluno.nome name=nome placeholder=Nome ng-required=true ng-minlength=10><br><input class=form-control type=text ng-model=vm.aluno.endereco.cep name=cep placeholder=CEP ng-required=true ng-minlength=8><br><input class=form-control type=text ng-model=vm.aluno.endereco.bairro name=bairro placeholder=Bairro ng-required=true><br><input class=form-control type=text ng-model=vm.aluno.endereco.localidade name=localidade placeholder=Localidade ng-required=true><br><input class=form-control type=text ng-model=vm.aluno.endereco.uf name=uf placeholder=UF ng-required=true><br><input class=form-control type=text ng-model=vm.aluno.turma name=turma ng-hide=true ng-required=true><select class=form-control ng-model=vm.aluno.turma ng-options=\"turma.descricao for turma in vm.turmas\"><option>Selecione a Turma</option></select><br><div ng-show=\"vm.alunoForm.nome.$error.required && vm.alunoForm.nome.$dirty\" class=\"alert alert-danger\">Por favor, preencha o campo nome!</div><div ng-show=\"vm.alunoForm.nome.$error.minlength && vm.alunoForm.nome.$dirty\" class=\"alert alert-danger\">O campo nome deve ter mais de 10 caractéres!</div><div ng-show=\"vm.alunoForm.turma.$error.required && vm.alunoForm.uf.$dirty\" class=\"alert alert-danger\">Selecione uma turma válida!</div><button class=\"btn btn-primary\" ng-click=vm.save() ng-disabled=vm.alunoForm.$invalid>{{\'action.SAVE\' | translate}}</button> <button class=\"btn btn-success\" ng-click=vm.clearFields()>{{\'action.CLEAN\' | translate}}</button></form></div></div>");
$templateCache.put("./src/features/aluno/views/aluno-details.html","<ndd-head title=\"{{\'header.EDIT_STUDENT\' | translate}}\"></ndd-head><div class=\"container-view padding-left\"><div class=\"col-sm-12 clear-padding\"><form name=vm.alunoForm class=jumbotron><input class=form-control type=text ng-model=vm.aluno.nome name=nome placeholder=Nome ng-required=true ng-minlength=10><br><input class=form-control type=text ng-model=vm.aluno.endereco.cep name=cep placeholder=CEP ng-required=true ng-minlength=8><br><input class=form-control type=text ng-model=vm.aluno.endereco.bairro name=bairro placeholder=Bairro ng-required=true><br><input class=form-control type=text ng-model=vm.aluno.endereco.localidade name=localidade placeholder=Localidade ng-required=true><br><input class=form-control type=text ng-model=vm.aluno.endereco.uf name=uf placeholder=UF ng-required=true><br><select class=form-control ng-model=vm.aluno.turma ng-options=\"turma.descricao for turma in vm.turmas\" ng-disabled=true><option value>Selecione a Turma</option></select><br><div ng-show=\"vm.alunoForm.nome.$error.required && vm.alunoForm.nome.$dirty\" class=\"alert alert-danger\">Por favor, preencha o campo nome!</div><div ng-show=\"vm.alunoForm.nome.$error.minlength && vm.alunoForm.nome.$dirty\" class=\"alert alert-danger\">O campo nome deve ter mais de 10 caractéres!</div><div ng-show=\"vm.alunoForm.turma.$error.selected && vm.alunoForm.nome.$dirty\" class=\"alert alert-danger\">Selecione uma turma válida!</div><button class=\"btn btn-primary\" ng-click=vm.save() ng-disabled=vm.alunoForm.$invalid>{{\'action.SAVE\' | translate}}</button> <button class=\"btn btn-success\" ng-click=vm.clearFields()>{{\'action.CLEAN\' | translate}}</button></form></div></div>");
$templateCache.put("./src/features/aluno/views/aluno-list.html","<ndd-head title=\"{{\'header.LIST_STUDENT\' | translate}}\"></ndd-head><ndd-table columns=\"[\'ID\',\'ALUNOS\', \'PRESENÇAS\', \'FALTAS\']\" attrs=\"[\'id\', \'nome\', \'presencas\', \'faltas\']\" data=vm.alunos cb-edit=vm.edit cb-remove=vm.remove security-edit=app.aluno.details security-remove=action.deleteAluno></ndd-table>");
$templateCache.put("./src/features/aula/views/aula-create.html","<ndd-head title=\"{{\'header.CREATE_LESSON\' | translate}}\"></ndd-head><div class=col-sm-12><form name=vm.aulaForm class=jumbotron><input class=form-control type=date ng-model=vm.aula.data name=data ng-required=true ng-minlength=10><br><input class=form-control type=text ng-model=vm.aula.turma name=turma ng-hide=true ng-required=true><br><select class=form-control ng-model=vm.aula.turma ng-options=\"turma.descricao for turma in vm.turmas\"><option value>Selecione a Turma</option></select><br><button class=\"btn btn-primary\" ng-click=vm.save() ng-disabled=vm.aulaForm.$invalid>{{\'action.SAVE\' | translate}}</button> <button class=\"btn btn-success\" ng-click=vm.clearFields()>{{\'action.CLEAN\' | translate}}</button></form></div>");
$templateCache.put("./src/features/aula/views/aula-list.html","<ndd-head title=\"{{\'header.LIST_LESSON\' | translate}}\"></ndd-head><ndd-table title=\"{{\'header.LIST_LESSON\' | translate}}\" columns=\"[\'ID\', \'DATA DA AULA\', \'TURMA\']\" attrs=\"[ \'id\',\'dataAula\', \'anoTurma\']\" data=vm.aulas cb-click=vm.onClick cb-remove=vm.remove></ndd-table>");
$templateCache.put("./src/features/group/views/group-create.html","<ndd-head title=\"{{\'header.CREATE_GROUPS\' | translate}}\"></ndd-head><div class=\"container-view padding-left\"><form><label>Grupo</label> <input type=text class=form-control ng-model=vm.group.name ng-change=\"vm.hasChange = true\"><br><label>Adminstrador:</label> <button type=button class=btn aria-label=isAdmin ng-class=\"{\'btn-warning\': vm.group.isAdmin}\" ng-click=vm.setAdmin() data-toggle=tooltip data-placement=top data-original-title={{title}}><span class=\"glyphicon glyphicon-star\"></span> {{title = vm.group.isAdmin ? (\'status.IS_ADMIN\' | translate) : (\'status.IS_NOT_ADMIN\' | translate) }}</button><br><br><label>Permissões:</label> <button class=\"btn btn-default\" disabled>Gerenciar Permissões</button> <span class=msgAllPermission ng-hide=vm.group.isAdmin><i class=\"fa fa-exclamation\"></i> <span>&nbsp;Salve o grupo para editar suas permissões</span></span> <span class=msgAllPermission ng-show=vm.group.isAdmin><i class=\"fa fa-star\"></i> Possui todas as permissões</span><hr></form></div><div class=\"col-sm-12 clear-padding text-center\"><button class=\"btn btn-success\" ng-click=vm.save()><i class=\"fa fa-save\"></i> <span>{{\'action.SAVE\' | translate}}</span></button></div>");
$templateCache.put("./src/features/group/views/group-edit.html","<ndd-head title=\"{{\'header.EDIT_GROUPS\' | translate}}\"></ndd-head><div class=\"container-view padding-left\"><form><label>Grupo</label> <input type=text class=form-control ng-model=vm.group.name ng-change=\"vm.hasChange = true\"><br><label>Adminstrador:</label> <button type=button class=btn aria-label=isAdmin ng-class=\"{\'btn-warning\': vm.group.isAdmin}\" ng-click=vm.setAdmin() data-toggle=tooltip data-placement=top title data-original-title={{title}}><span class=\"glyphicon glyphicon-star\"></span> {{title = vm.group.isAdmin ? (\'status.IS_ADMIN\' | translate) : (\'status.IS_NOT_ADMIN\' | translate) }}</button><br><br><label>Permissões:</label> <button class=\"btn btn-default\" ng-click=vm.editPermission() ng-disabled=vm.group.isAdmin>Gerenciar Permissões</button> <span class=msgAllPermission ng-show=vm.group.isAdmin><i class=\"fa fa-star\"></i> Possui todas as permissões</span></form><hr><div class=\"text-center col-sm-12 clear-padding\"><button class=\"btn btn-success\" ng-click=vm.save()><i class=\"fa fa-save\"></i> {{\'action.SAVE\' | translate}}</button></div></div>");
$templateCache.put("./src/features/group/views/group-list.html","<ndd-head title=\"{{\'header.LIST_GROUPS\' | translate}}\"></ndd-head><ndd-table columns=\"[\'ID\', \'NOME\', \'ADMINISTRADOR\']\" attrs=\"[\'id\',\'name\', \'isAdmin\']\" data=vm.groups cb-edit=vm.edit cb-remove=vm.remove security-edit=app.group.edit></ndd-table>");
$templateCache.put("./src/features/group/views/group-permission-edit.html","<ndd-head title=\"{{\'entities.PERMISSIONS\' | translate}} de {{vm.group.name}}\"></ndd-head><div ng-class=\"{\'disabled\': vm.group.isAdmin}\"><div class=row><div class=\"col-sm-offset-3 col-sm-6 clear-padding\"><ndd-group-checkbox array=vm.permissions compare=vm.group.permissions method=vm.comparePermissions callback=vm.onchange></ndd-group-checkbox></div></div><div class=row><div class=\"col-xs-12 text-center clear-padding\"><h3 ng-hide=\"vm.permissions && vm.permissions.length > 0\">Não há permissões cadastradas.</h3></div></div><div class=row><div class=\"col-xs-12 text-center clear-padding\"><hr><button class=\"btn btn-info\" ng-click=vm.save() ng-disabled=!vm.hasChange><i class=\"fa fa-save\"></i> {{\'action.SAVE\' | translate}}</button></div></div></div>");
$templateCache.put("./src/features/turma/views/turma-create.html","<ndd-head title=\"{{ \'header.CREATE_CLASS\' | translate }}\"></ndd-head><div class=\"container-view padding-left\"><div class=\"col-sm-12 clear-padding\"><form name=vm.turmaForm class=jumbotron><input class=form-control type=text value=\"Academia do Programador\" name=descricao ng-required=true ng-disabled=true><br><input class=form-control type=number value=2000 ng-model=vm.turma.ano name=ano ng-required=true ng-minlength=4 ng-maxlength=4><br><div ng-show=\"vm.turmaForm.ano.$error.required && vm.turmaForm.ano.$dirty\" class=\"alert alert-danger\">Por favor, preencha o campo ano com 4 números! (ex:2000)</div><button class=\"btn btn-primary\" ng-click=vm.save() ng-disabled=vm.turmaForm.$invalid>Salvar</button> <button class=\"btn btn-success\" ng-click=vm.clearFields() ng-disabled=!vm.turmaForm.ano.$dirty>Limpar</button></form></div></div>");
$templateCache.put("./src/features/turma/views/turma-details.html","<ndd-head title=\"{{ \'header.EDIT_CLASS\' | translate }}\"></ndd-head><div class=\"col-sm-offset-1 col-sm-10\"><form name=vm.turmaForm class=jumbotron><input class=form-control type=text value=\"Academia do Programador\" name=descricao ng-required=true ng-disabled=true><br><input class=form-control type=number value=2000 ng-model=vm.turma.ano name=ano ng-required=true ng-disabled=false><br><div ng-show=\"vm.turmaForm.ano.$error.required && vm.turmaForm.ano.$dirty\" class=\"alert alert-danger\">Por favor, preencha o campo ano!</div><div ng-show=\"vm.turmaForm.ano.minlength && vm.alunoForm.ano.$error.$dirty\" class=\"alert alert-danger\">O campo ano deve ter 4 digitos!</div><button class=\"btn btn-primary\" ng-click=vm.save() ng-disabled=vm.turmaForm.$invalid>{{ \'action.SAVE\' | translate }}</button> <button class=\"btn btn-success\" ng-click=vm.clearFields()>{{ \'action.CLEAN\' | translate }}</button></form></div>");
$templateCache.put("./src/features/turma/views/turma-list.html","<ndd-head title=\"{{ \'header.LIST_CLASS\' | translate }}\"></ndd-head><ndd-table title=\"{{ \'entities.CLASS\' | translate }}\" columns=\"[\'ID\', \'TURMA\']\" attrs=\"[\'id\', \'descricao\']\" data=vm.turmas cb-edit=vm.edit cb-remove=vm.remove security-remove=action.deleteTurma security-edit=app.turma.details></ndd-table>");
$templateCache.put("./src/features/user/views/user-edit-group.html","<ndd-head title=\"{{\'entities.GROUP\' | translate}}: {{vm.user.firstName + \' \' + vm.user.lastName }}\"></ndd-head><div class=\"container-user fadeIn enter-fadeIn\"><div class=row><h3 ng-show=\"vm.groups.length <= 0\" class=text-center>Não há grupos cadastrados</h3><div class=\"col-sm-offset-3 col-sm-6 clear-padding\"><ndd-group-checkbox array=vm.groups compare=vm.user.groups callback=vm.onchange></ndd-group-checkbox></div></div><div class=row><div class=\"col-xs-12 text-center clear-padding\"><hr><button class=\"btn btn-success\" ng-click=vm.save() ng-disabled=!vm.hasChange><i class=\"fa fa-save\"></i> <span>{{\'action.SAVE\' | translate}}</span></button></div></div></div>");
$templateCache.put("./src/features/user/views/user-edit.html","<ndd-head title=\"{{\'header.EDIT_USERS\' | translate }}\"></ndd-head><div class=\"col-sm-offset-2 col-sm-8\"><div style=\"padding-right: 2%;\"><div ng-include=\"\'src/common/templates/components/user-profile.html\'\"></div></div><div class=\"col-sm-12 clear-padding\"><br><div class=\"col-xs-12 clear-padding\"><h3 style=\"margin-top: 0;\">Configurações</h3><hr style=\"margin-top: 2%\"><br></div><label for=groups>Grupos:</label> <button class=\"btn btn-info\" ng-click=vm.editGroups()><i class=\"fa fa-users\"></i> <span>Editar Grupos</span></button></div></div><div class=\"col-sm-12 clear-padding text-center\"><div class=footer><br><br><hr><button class=\"btn btn-success\" ng-click=vm.saveChanges() ng-disabled=vm.formUser.$pristine><i class=\"fa fa-check-square-o\"></i> <span>Salvar Alterações</span></button> <button class=\"btn btn-info\" ng-click=vm.clear()><i class=\"fa fa-history\"></i> <span>Desfazer Alterações</span></button></div></div>");
$templateCache.put("./src/features/user/views/user-list.html","<ndd-head title=\"{{\'header.LIST_USERS\' | translate }}\"></ndd-head><ndd-table columns=\"[\'ID\',\'NOME\', \'LOGON\', \'E-MAIL\']\" attrs=\"[\'id\',\'fullName\', \'userName\', \'email\']\" data=vm.users cb-edit=vm.edit cb-remove=vm.remove security-edit=app.user.edit></ndd-table>");
$templateCache.put("./src/common/layout/views/partials/footer.html","<span>&copy; {{app.year}} - {{ app.name }}</span>");
$templateCache.put("./src/common/layout/views/partials/top-navbar.html","<nav role=navigation class=\"navbar topnavbar\"><div class=navbar-header><a href=\"#/\" class=navbar-brand><div class=brand-logo><img src=src/images/logo.svg alt=\"App Logo\" class=img-responsive></div><div class=brand-logo-collapsed><img src=src/images/logo-single.svg alt=\"App Logo\" class=img-responsive></div></a></div><div class=nav-wrapper><ul class=\"nav navbar-nav\"><li><a href trigger-resize ng-click=\"app.layout.isCollapsed = !app.layout.isCollapsed\" class=hidden-xs><em class=\"fa fa-navicon\"></em></a></li><li><a ng-click=shell.logOut() title=\"Lock screen\"><em class=icon-lock></em></a></li><li><a class=\"visible-lg visible-md\" ng-click=toggleUserBlock()><em class=icon-user></em></a></li><li><a href ng-click=\"app.asideToggled = !app.asideToggled\" class=\"visible-xs sidebar-toggle\"><em class=\"fa fa-navicon\"></em></a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li><a search-open><em class=icon-magnifier></em></a></li><li><a href ng-click=\"app.offsidebarOpen = !app.offsidebarOpen\"><em class=icon-notebook></em></a></li></ul></div><form role=search action=search.html class=navbar-form><div class=\"form-group has-feedback\"><input type=text placeholder=\"{{ \'topbar.search.PLACEHOLDER\' | translate }}\" class=form-control><div search-dismiss=search-dismiss class=\"fa fa-times form-control-feedback\"></div></div><button type=submit class=\"hidden btn btn-default\">Submit</button></form></nav>");}]);