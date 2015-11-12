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
                modules: [paths.app + '**/**/*.module.js'],
                extentions: [paths.app + 'common/extentions/*.js'],
                configs: [paths.app + "**/**/*.config.js", '!' + paths.app + "common/routes/routes.config.js"],
                constant: [paths.app + "**/**/*.constants.js"],
                provider: [paths.app + "**/**/*.provider.js"],
                adapters: [paths.app + "**/**/*.adapter.js"],
                factory: [paths.app + "**/**/*.factory.js"],
                services: [paths.app + '**/**/*.service.js'],
                controllers: [paths.app + '**/**/*.controller.js'],
                route: [paths.app + '**/**/*.routes.js', paths.app + 'common/routes/routes.config.js'],
                directive: [paths.app + "**/**/*.directive.js"],
                run: [paths.app + "**/**/*.run.js"]
            },

            css: {
                'static': [paths.app + "content/**/**/*.css",
                           paths.app + "content/css/**/app.css",
                           "!" + paths.app + "content/css/theme/theme*.css",
                           "!" + paths.app + "content/**/**/bootstrap*.css"
                ],

                lazy: {
                    theme: {
                        src: [paths.app + "content/css/theme/theme*.css"],
                        dist: paths.dist + "src/content/css/theme/"
                    }
                },
            },
            sass: {
                all: paths.app + "content/**/**/**/*.scss",
                bootstrap: paths.app + "content/libs/bootstrap/bootstrap.scss",
                angle: paths.app + "content/app.scss",
                themes: paths.app + "content/**/theme*.scss"
            },

            json: [paths.app + '**/**/*.json'],

            fonts: {
                all: [paths.app + "**/**/fonts/*.*", "!" + paths.app + "content/fonts/*.*"],
                bootstrap: [paths.app + "content/fonts/*.*"]
            },

            images: [paths.app + "images/**/**/*.*"],

            vendor: {
                root: paths.app + "vendor/",
                all: paths.app + "vendor/**/**/**/*.*"
            }
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
                fonts: paths.dist + "/fonts/",
                vendor: paths.dist + "src/vendor/"
            },
            css: paths.app + "content/css/",
            images: paths.dist + "images/"
        },

        clean: {
            dist: {
                all: "./dist",
                css: paths.app + "content/css/**/**/*.css",
            },
            vendor: [paths.app + "vendor/*.*"]

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
        var resources = {
            'modules': config.app.js.modules,
            'extentions': config.app.js.extentions,
            'provider': config.app.js.provider,
            'config': config.app.js.configs,
            'constant': config.app.js.constant,
            'factory': config.app.js.factory,
            'adapter': config.app.js.adapters,
            'service': config.app.js.services,
            'controller': config.app.js.controllers,
            'routes': config.app.js.route,
            'directive': config.app.js.directive,
            'templates': [config.templatecache.path + config.templatecache.file],
            'run': config.app.js.run,
        }

        var ignored = require("../src/lazy-resources.json");

        for (var resource in resources) {
            ignored.map(function (ignore) {
                resources[resource].push("!" + ignore);
            });
        }
        return resources;
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
                         "!" + bower + "**/**/**/example*.css",
                         "!" + bower + "modernizr/**/**/*.css",
                         "!" + bower + "/ng-table/docs/**/*.css",
                         "!" + bower + "/**/sweetalert/themes/**/*.css",
                         "!" + bower + "/**/sweetalert/dev/**/*.css"];

        var vendors = require("../src/vendor.json");
        vendors.map(function (vendor) {
            resources.push("!" + vendor);
        });

        return resources;
    }
    return config;

}
