module.exports = function () {

    // MAIN PATHS
    var paths = {
        app: './src/',
        dist: "./dist/"
    };
    var bower = "./bower_components/";

    var config = {

        root: "./",

        index: "./index.html",

        app: {
            html: [paths.app + "**/**/*.html"],

            js: {
                'static': {
                    modules: paths.app + '**/**/*.module.js',
                    extentions: paths.app + 'common/extentions/*.js',
                    configs: [paths.app + "**/**/*.config.js", '!' + paths.app + "common/routes/routes.config.js"],
                    constant: paths.app + "**/**/*.constants.js",
                    provider: paths.app + "**/**/*.provider.js",
                    adapters: paths.app + "**/**/*.adapter.js",
                    factory: paths.app + "**/**/*.factory.js",
                    services: paths.app + '**/**/*.service.js',
                    controllers: [paths.app + 'common/layout/shell.controller.js',
                                  paths.app + 'common/sidebar/sidebar.controller.js',
                                  paths.app + 'common/sidebar/sidebar.userblock.controller.js'],
                    route: paths.app + '**/**/*.routes.js',
                    routeConfig: paths.app + 'common/routes/routes.config.js',
                    directive: paths.app + "**/**/*.directive.js",
                    run: paths.app + "**/**/*.run.js",
                },

                lazy: {
                    controller: {
                        src: [paths.app + '**/**/**/*.controller.js',
                              "!" + paths.app + 'common/layout/shell.controller.js',
                              "!" + paths.app + 'common/sidebar/sidebar.controller.js',
                              "!" + paths.app + 'common/sidebar/sidebar.userblock.controller.js'],
                        dist: paths.dist + "src/"
                    },
                    vendor: {
                        src: [paths.app + "vendor/**/**/*.js"],
                        dist: paths.dist + "src/vendor/"
                    }
                }
            },

            css: {
                'static': [paths.app + "content/**/**/*.css",
                   paths.app + "content/css/**/app.css",
                   "!" + paths.app + "content/theme/theme*.css",
                   "!" + paths.app + "content/**/**/bootstrap*.css"
                ],

                lazy: {
                    theme: {
                        src: [paths.app + "content/theme/theme*.css"],
                        dist: paths.dist + "src/content/theme/"
                    },
                    vendor: {
                        src: [paths.app + "vendor/**/**/*.css"],
                        dist: paths.dist + "src/vendor/"
                    }
                },
            },
            sass: {
                all: paths.app + "content/**/**/**/*.scss",
                bootstrap: paths.app + "content/libs/bootstrap/bootstrap.scss",
                angle: paths.app + "content/app.scss"
            },

            json: [paths.app + '**/**/*.json'],

            fonts: {
                all: [paths.app + "**/**/fonts/*.*", "!" + paths.app + "content/fonts/*.*"],
                bootstrap: [paths.app + "content/fonts/*.*"]
            },

            images: [paths.app + "images/**/**/*.*"],

            vendor: paths.app + "vendor/"
        },

        libs: {
            css: getLibsCss()
        },

        bower: {
            json: require("../bower.json"),
            directory: "./bower_components",
            ignorePath: "../"
        },

        dist: {
            root: paths.dist,
            src: {
                root: paths.dist + "src/",
                images: paths.dist + "src/images/",
                fonts: paths.dist + "/fonts/"
            },
            css: paths.app + "content/css/",
            images: paths.dist + "images/"
        },

        clean: {
            dist: {
                all: "./dist",
                css: paths.app + "content/css/**/**/*.css",
            }

        },

        templatecache: {
            path: "./src/common/templatecache/",
            file: "templates.js",
            options: {
                module: 'diarioacademia',
                standAlone: false,
                root: './src/'
            }
        },
    };

    // Resources
    config.getResourcesInjected = function () {
        return {
            'modules': config.app.js.static.modules,
            'extentions': config.app.js.static.extentions,
            'provider': config.app.js.static.provider,
            'config': config.app.js.static.configs,
            'constant': config.app.js.static.constant,
            'adapters': config.app.js.static.adapters,
            'factory': config.app.js.static.factory,
            'service': config.app.js.static.services,
            'controller': config.app.js.static.controllers,
            'routes': config.app.js.static.route,
            'config.routes': config.app.js.static.routeConfig,
            'directive': config.app.js.static.directive,
            'templates': config.templatecache.path + config.templatecache.file,
            'run': config.app.js.static.run,
        }
    }

    // Wiredep
    config.getWiredepDefaultOptions = function () {
        return {
            bower: config.bower.json,
            diretory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            devDependencies: false,
            fileTypes: {
                html: {
                    replace: {
                        js: '<script src="/{{filePath}}"></script>'
                    }
                }
            },
            exclude: require("../src/vendor.json")
        };
    }

    //Browsersync
    config.getBrowsersyncOptions = function () {
        return {
            server: {
                baseDir: "./"
            },
            //watcher for restart
            files: [
               'src/content/theme/*.css',
               'src/**/**/**/**/*.js',
               '**/**/**/*.html'
            ],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true, // injetar modificações
            logFilesChanges: true,
            logLevel: 'debug',
            log: 'gulp-patterns',
            notify: true,
            reloadDelay: 0
        };
    }

    //Helpers
    function getLibsCss() {
        var resources = [bower + "/**/**/**/*.css",
                         paths.app + "content/css/**/bootstrap.css",
                         "!" + bower + "**/**/**/*.min.css",
                         "!" + bower + "**/**/**/font-awesome*.css",
                         "!" + bower + "**/**/**/bootstrap*.css",
                         "!" + bower + "**/examples/**/*.css",
                         "!" + bower + "modernizr/**/**/*.css",
                         "!" + bower + "/ng-table/docs/**/*.css"];

        var vendors = require("../src/vendor.json");
        vendors.map(function (vendor) {
            resources.push("!" + vendor);
        });
        return resources;
    }

    return config;


}
