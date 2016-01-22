module.exports = function () {
    var log = function (msg) {
        if (typeof (msg) != 'object')
            loader.util.log(loader.util.colors.green(msg));
        else {
            for (var item in msg) {
                if (msg.hasOwnProperty(item))
                    loader.util.log(loader.util.colors.green(msg[item]));
            }
        }
    };
    return log;
}