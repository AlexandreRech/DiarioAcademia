(function () {
    'use strict';

    eventAdapter.$inject = ["automapper"];

    angular
      .module('services.module')
      .factory('eventAdapter', eventAdapter);


    function eventAdapter(automapper) {

        var factory = this;

        init();
        function init() {
            automapper.createMap("dataJSON", "event")
                     .forMember("author", function () {
                         return {
                             name: this.author.name,
                             url: this.actor.url.replace("api.", "").replace("users/", "")
                         }
                     })
                     .forMember("message", function () { return this.message })
                     .forMember("url", function () { return this.url.replace("api.", "").replace("repos/", "") })
                     .forMember("date", function () { return new Date(this.created_at).toLocaleDateString('pt-BR'); });
        }

        //public methods
        factory.toEvent = function (obj) {
            var results = [];
            var result = {};
            obj.payload.commits.map(function (commit) {
                commit.actor = obj.actor;
                commit.created_at = obj.created_at;
                automapper.map("dataJSON", "event", commit, result);
                results.push(result);
                result = {};
            });
           
            return results;
        };

        return factory;
    }
})();