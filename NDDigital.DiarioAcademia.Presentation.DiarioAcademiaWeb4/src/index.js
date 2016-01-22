require('expose?jQuery!expose?$!jquery'); // Expose jquery
require('expose?toastr!expose?$!toastr'); // Expose toastr
require('expose?swal!expose?$!sweetalert') // Expose sweetalert

var angular = require('angular');
require('angular-local-storage');
require("angular-sweetalert");
require('ngstorage');


//Load Styles
require("style!css!sass!./app.scss");

var app = angular.module('diarioacademia', [
        //libs
        require('angular-ui-router'),
        require('oclazyload'),
        require("angular-animate"),
        require('angular-ui-bootstrap'),
        'oitozero.ngSweetAlert',
        'LocalStorageModule',
        'ngStorage',
        require("angular-loading-bar"),

       //app
        require('./common/common.module'),
        require("./common/extentions/extentions.module"),
        require("./common/translate/translate.module"),
        require("./components/preloader/preloader.module"),
        require("./common/settings/settings.module"),
        require("./common/automapper/automapper.module"),
        require("./components/loadingbar/loadingbar.module"),
        //security
        require("./common/authentication/authentication.module"),
        require("./common/authorization/authorization.module"),
        require("./common/ndd-security/ndd-security.module"),
]);

// Define settings of routes
app.config(require("./common/routes/routes.config"));

// Load all routes
var req = require.context('./', true, /routes.js$/);
req.keys().forEach(function (file) {
    app.config(req(file));
});

module.exports = app;