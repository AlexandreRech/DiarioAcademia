(function () {

    String.prototype.contains = function (value) {
        return this.indexOf(value) >= 0;
    }

    String.prototype.replaceAll = function (oldChar, newChar) {
        return this.split(oldChar).join(newChar);
    }


})();