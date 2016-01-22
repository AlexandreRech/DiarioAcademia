var routes = angular.module('app.routes', []);

routes.run(require("./routes.run.js"));

module.exports = routes.name;