(function () {
    'use strict';

    //using
    overviewService.$inject = ['$http', 'logger', 'BASEURL', ];

    //namespace
    angular.module('services.module')
       .service('overviewService', overviewService);

    //class
    function overviewService($http, logger, baseUrl) {
        var self = this;
        var serviceUrl = baseUrl + "api/overview/";

        //public methods
        self.getOverview = function () {
            return $http.get(serviceUrl + "summary")
                 .then(logger.emptyMessageCallback)
                 .catch(logger.errorCallback);
        };

    }
})();