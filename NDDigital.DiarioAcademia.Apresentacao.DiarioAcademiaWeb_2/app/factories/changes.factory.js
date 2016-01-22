(function (angular) {
    angular.module("factories.module")
        .factory("changes.factory", changeFactory);

    function changeFactory() {
        return {
            getInclude: getInclude,
            getExclude: getExclude

        };

        function getInclude(array) {
            var include = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i].action)
                    include.push(array[i]);
            }
            return include;
        }

        function getExclude(array) {
            var exclude = [];
            for (var i = 0; i < array.length; i++) {
                if (!array[i].action)
                    exclude.push(array[i]);
            }
            return exclude;
        }

    }
})(window.angular);