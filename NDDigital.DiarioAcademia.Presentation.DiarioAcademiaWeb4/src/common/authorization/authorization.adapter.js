/* @ngInject */
module.exports = function adapterAutho(automapper, authoUtilFactory) {
 
    init();
    function init() {
        automapper.createMap("authorization", "authorizationDto")
                    .forMember("id", function () { return this.id })
                    .forMember("name", function () { return this.name })
                    .forMember("permissions", function () {
                        return this.permissions;
                    });
    }

    return {
        makeAuthorizationDto: makeAuthorizationDto,
        toAuthorization: toAuthorization
    }

    //public methods
    function makeAuthorizationDto(obj) {
        var result = {};
        automapper.map("authorization", "authorizationDto", obj, result);
        return result;
    };

    function toAuthorization(obj) {
        var result = authoUtilFactory.getByName(obj.name || obj);
        if (!result)
            return {};
        if (obj.id)
            result.id = obj.id;
        return result;
    };
}