(function () {
    'use strict';

    eventAdapter.$inject = ["automapper"];

    angular.module('factories.module') .factory('eventAdapter', eventAdapter);


    function eventAdapter(automapper) {

        var factory = this;

        init();
        function init() {
            automapper.createMap("dataJSON", "event")
                     .forMember("author", function () {
                         return {
                             name: this.commit.author.name,
                             url: this.committer.html_url
                         }
                     })
                     .forMember("message", function () { return this.commit.message })
                     .forMember("url", function () { return this.html_url })
                     .forMember("date", function () { return new Date(this.commit.author.date).toLocaleDateString('pt-BR'); })
                     .forMember("comment_count", function () { return this.commit.comment_count });
        }

        //public methods
        factory.toEvent = function (obj) {
            var result = {};
            automapper.map("dataJSON", "event", obj, result);
            return result;
        };

        return factory;
    }
})();