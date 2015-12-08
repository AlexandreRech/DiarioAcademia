(function () {

    'use strict';
    //using
    adapter.$inject = ["automapper", "authoUtilFactory"];

    //namespace
    angular.module('app.authorization').factory('authoAdapter', adapter);

    //class
    function adapter(automapper, authoUtilFactory) {
        var factory = {};

        init();
        function init() {
            automapper.createMap("authorization", "authorizationDto")
                        .forMember("id", function () { return this.id })
                        .forMember("name", function () {return this.name})
                        .forMember("permissions", function () {
                            return this.permissions;
                        });
        }

        //public methods
        factory.makeAuthorizationDto = function (obj) {
            var result = {};
            automapper.map("authorization", "authorizationDto", obj, result);
            return result;
        };

        factory.toAuthorization = function (obj) {
            var result = authoUtilFactory.getByName(obj.name || obj);
            if (obj.id)
                result.id = obj.id;
            return result;
        };

        return factory;
    }

})();