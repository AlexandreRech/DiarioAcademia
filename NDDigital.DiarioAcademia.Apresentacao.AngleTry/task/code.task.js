/*
 *  
 * CODE TASKS 
 * 
 * gulp tasks handling source code
 * 
 */

//Injects
gulp.task('inject', 'Inject the files in the index.html', ['inject-css', 'templatecache', 'build-fonts-dev'], function (callback) {
    var resources = config.getResourcesInjected();
    var source = gulp.src(config.index);
    for (var resource in resources) {
        source = source.pipe(loader.inject(gulp.src(resources[resource]), {
            starttag: "<!--inject:" + resource + "-->"
        }));
    }
    source
        .pipe(gulp.dest(config.root)).on('end', callback);;
});

gulp.task('inject-css', 'Inject only css app in the index.html', gulpsync.sync(['compile-sass', 'inject-lib']), function (callback) {
    gulp.src(config.index)
         .pipe(loader.inject(gulp.src(config.app.css.static), {
             starttag: "<!--inject:app-->"
         }))
        .pipe(gulp.dest(config.root).on('end', callback));
});

gulp.task('inject-lib', 'Inject only libs in the index.html', function (callback) {
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    var source = gulp.src(config.index);
    for (var lib in config.libs.js) {
        var res = gulp.src(config.libs.js[lib]);
        source = source.pipe(loader.inject(res, { starttag: "<!--inject:js-->" }));
    }
    source.pipe(loader.inject(gulp.src(config.libs.css)))
          .pipe(wiredep(options))
          .pipe(gulp.dest(config.root).on('end', callback));
});

// Compile Tasks
gulp.task('compile-sass', 'Compile sass', ['clean-css'], function () {
    return gulp.src(config.app.sass.app)
              .pipe(addsrc(config.app.sass.libs))
              .pipe(addsrc(config.app.sass.themes))
              .pipe(compileSass().on('error', compileSass.logError))
              .pipe(gulp.dest(config.dist.css))
              .pipe(loader.if(args.livereload, browserSync.stream()));
});

//Cache
gulp.task('templatecache', 'Generate template cache', function () {
    gulp.src(config.app.html)
         .pipe(loader.minifyHtml({
             empty: true,
             conditionals: true
         }))
         .pipe(loader.angularTemplatecache(config.templatecache.file, config.templatecache.options))
         .pipe(gulp.dest(config.templatecache.path));
});

//Deploy of lazy load resources describes in vendor.json
gulp.task('vendor-lazy', 'Put in paste vendor lazy dependencies define in vendor.json', ['clean-vendor'], function (done) {
    var vendors = require("../src/vendor.json");
    gulp.src(vendors, { base: 'bower_components' })
        .pipe(gulp.dest(config.app.vendor.root).on('end', done));
});