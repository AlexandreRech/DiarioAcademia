(function () {
    angular.module("ngAutomapper", []).factory("automapper", automapper);

    function automapper() {
        var mappings = {};

        return {
            map: map,
            createMap: createMap
        };
        
        //public methods
        function createMap(typeFrom, typeTo) {
            var key = formatKey(typeFrom, typeTo);
            var mapping = new Mapping(key);

            mappings[key] = mapping;

            return mapping;
        };

        function map(typeFrom, typeTo, fromObj, toObj) {
            var key = formatKey(typeFrom, typeTo);
            var mapping = mappings[key];

            for (var prop in mapping.memberMappings) {
                var map = mapping.memberMappings[prop];
                if (prop === "forAll") {
                    continue;
                }
                toObj[prop] = map.call(fromObj);
            }

            if (typeof mapping.memberMappings.forAll !== 'undefined') {
                for (var prop in fromObj) {
                    var value = fromObj[prop];
                    if (typeof mapping.ignoreMembers[prop] !== 'undefined') {
                        continue;
                    }
                    toObj[prop] = mapping.memberMappings.forAll.call(fromObj, prop);
                }
            }
        };

        //private methods
        function formatKey(typeFrom, typeTo) {
            return typeFrom + ' ' + typeTo;
        }


        function Mapping(key) {
            var _key = key;
            this.memberMappings = {};
            this.ignoreMembers = {};

            this.forAllMembers = function (formatCallback) {
                this.memberMappings.forAll = formatCallback;
            };

            this.forMember = function (member, formatCallback) {
                this.memberMappings[member] = formatCallback;
                return this;
            };

            this.ignore = function (member) {
                this.ignoreMembers[member] = true;
                return this;
            };
            return this;
        }


    }

})();