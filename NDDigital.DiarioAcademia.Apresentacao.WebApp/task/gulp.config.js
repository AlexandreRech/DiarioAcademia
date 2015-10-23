module.exports = function () {
    var dist = './dist',
        app = './app',
        bower = "./bower_components",
        routesConfig = app + "/routes/**/config.routes.js",
        portDefault = process.env.PORT || 3000;

    var config = {
        port: portDefault,
        index: './index.html',
        fonts: [bower + "/font-awesome/fonts/*.*", bower + "/bootstrap/fonts/*.*"],
        root: './',
        path: __dirname.replace('task', ''),

        // Build config     
        dist: {
            root: dist,
            all: dist + '/**/*.*',
            js: dist + '/**/*.js',
            css: dist + '/**/*.css',
            font: dist + '/fonts',
            app: dist + "/app",
            html: dist + '/**/*.html'
        },

        app: {
            js: {
                models: app + "/models/*.model.js",
                adapters: app + "/adapters/*.adapter.js",
                factories: app + "/factories/**/*.js",
                module: app + "/modules/*.module.js",
                routes: [app + "/routes/**/*.routes.js", "!" + routesConfig],
                routeConfig: routesConfig,
                service: app + "/services/**/*.js",
                controllers: app + "/controllers/**/*.controller.js",
                directives: app + "/directives/**/*.directives.js"
            },

            html: app + "/**/**/*.html",

            css: ["./content/**/**/*.css", "!./content/**/**/*.min.css"],

            images: [app + '/**/**/*.png', app + '/**/**/*.gif', app + '/**/**/*.jpg']
        },

        templatecache: {
            path: "./task/temp/",
            file: "templates.js",
            options: {
                module: 'core.module',
                standAlone: false,
                root: './app/'
            }
        },

        libs: {
            js: [bower + "/**/**/**/*.min.js"],
            css: [bower + "/**/**/**/*.css", "!" + bower + "**/**/**/*.min.css"]
        },

        bower: {
            bower: require("../bower.json"),
            directory: "./bower_components",
            ignorePath: ['../']
        },

        extentions: app + '/extentions/**/*.js'

    };

    /*  Functions  */

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
            }
        };
    }

    //BrowserSync
    config.getBrowsersyncOptionsDefault = function () {
        return {
            //proxy: 'localhost:' + portDefault,   // use this for proxy
            server: {
                baseDir: "./"
            },
            //watcher for restart
            files: [
                app + '/**/*.*',
                './content/**/*.css',
                './*.html',
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

    //Resources Injected
    config.getResourcesInjected = function () {
        return {
            'extentions': config.extentions,
            'module': config.app.js.module,
            'models': config.app.js.models,
            'adapters': config.app.js.adapters,
            'factories': config.app.js.factories,
            'routes': config.app.js.routes,
            'config.routes': config.app.js.routeConfig,
            'service': config.app.js.service,
            'controllers': config.app.js.controllers,
            'directives': config.app.js.directives,
            'templates': config.templatecache.path + config.templatecache.file,
            'appcss': config.app.css
        };
    }

    return config;
}