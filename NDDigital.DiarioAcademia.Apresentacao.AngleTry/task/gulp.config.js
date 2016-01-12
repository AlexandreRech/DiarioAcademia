module.exports = function () {

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
                'static': [paths.app + "stylesheets/css/**/app.css",
                           "!" + paths.app + "stylesheets/css/theme/theme*.css"],
                lazy: {
                    theme: {
                        src: [paths.app + "stylesheets/css/theme/theme*.css"],
                        dist: paths.dist + "src/stylesheets/css/theme/"
                    }
                },
            },
            sass: {
                all: paths.app + "stylesheets/**/**/*.scss",
                app: paths.app + "stylesheets/app.scss",
                libs: paths.app + "stylesheets/libs.scss",
                themes: paths.app + "stylesheets/**/theme*.scss"
            },

            json: [paths.app + '**/**/*.json'],

            fonts: {
                all: [paths.app + "**/**/fonts/*.*", "!" + paths.app + "stylesheets/fonts/*.*"],
                bootstrap: [bower + "bootstrap-sass/assets/fonts/bootstrap/*.*"]
            },

            images: [paths.app + "images/**/**/*.*"],

            vendor: {
                root: paths.app + "vendor/",
                all: paths.app + "vendor/**/**/**/*.*"
            }
        },

        libs: {
            js: require("../src/custom-libs.json"),
            css: paths.app + "stylesheets/css/**/libs.css"
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
            css: paths.app + "stylesheets/css/",
            images: paths.dist + "images/"
        },

        clean: {
            dist: {
                all: "./dist",
                css: paths.app + "stylesheets/css/**/**/*.css",
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
               'src/stylesheets/theme/*.css',
               'src/**/**/**/**/*.js',
               '**/**/**/*.html'
            ],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,  
            logFilesChanges: true,
            logLevel: 'debug',
            log: 'gulp-patterns',
            notify: true,
            reloadDelay: 0
        };
    }
    return config;

}
