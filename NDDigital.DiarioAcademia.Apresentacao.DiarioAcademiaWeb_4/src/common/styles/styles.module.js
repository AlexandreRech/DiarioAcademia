var style = angular.module('app.styles', []);
style.run(require('./styles.run'));
module.exports = style.name;