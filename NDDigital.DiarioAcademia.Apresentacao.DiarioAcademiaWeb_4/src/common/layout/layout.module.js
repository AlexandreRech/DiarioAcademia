var layout = angular.module('app.layout', [
    require('../styles/styles.module'),
    require('../../components/navbar/navbar.module'),
    require('../../components/sidebar/sidebar.module'),
    require('../../components/offsidebar/offsidebar.module')
]);

layout.constant('APP_MEDIAQUERY', require("./layout.constants"));
layout.directive('layout', require('./layout.directive'));

module.exports = layout.name;