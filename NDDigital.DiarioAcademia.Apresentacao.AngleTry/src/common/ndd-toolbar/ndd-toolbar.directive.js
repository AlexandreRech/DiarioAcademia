(function(angular){
	angular.module('app.nddtoolbar')
		.directive('nddToolbar', nddToolbar);
	
	function nddToolbar(){
		return{
			restrict: 'E',
			link: link, 
			replace: false,
			transclude: false,
			scope:{
				cbProperties: "=",
				cbRemove: "=",
				cbNew: "=",
				stateNew: "@",
				securityProperties: "@",
				securityRemove: "@"
			},
			templateUrl: 'src/common/ndd-toolbar/ndd-toolbar.html'
		}
		
		function link(scope, element, attrs){
		}

		
	}
})(window.angular);