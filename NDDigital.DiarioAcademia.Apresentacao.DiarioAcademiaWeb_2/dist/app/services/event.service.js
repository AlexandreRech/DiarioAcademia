
(function () {
    'use strict';

    //using
    eventService.$inject = ['$http', 'logger', 'eventAdapter'];

    //namespace
    angular.module('services.module')
       .service('eventService', eventService);

    //class
    function eventService($http, logger, eventAdapter) {
        var self = this;
        var serviceUrl = "https://api.github.com/repos/AlexandreRech/DiarioAcademia/commits?per_page=";

        //public methods
        self.getLatestActivities = function (per_page) {
            return $http({
                method: 'GET',
                url: serviceUrl + (per_page || "10"),
                ignoreAuth: true
            })
              .then(logger.emptyMessageCallback)
              .then(convertToObj)
              .catch(logger.errorCallback);
        }


        function convertToObj(data) {
            if ($.isArray(data)) {
                var result = [];
                $.map(data, function (item) {
                    result.push(eventAdapter.toEvent(item));
                });
                return result;
            } else {
                return eventAdapter.toEvent(data);
            }
        };
    }
})();