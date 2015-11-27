/*
 *  
 * CODE TASKS 
 * 
 * gulp tasks handling source code
 * 
 */

gulp.task('inject', 'Inject the files in the index.html', gulpsync.sync(['compile-less', ['inject-lib', 'templatecache']]), function (callback) {
    var resources = config.getResourcesInjected();
    var source = gulp.src(config.index);
    for (var resource in resources) {
        source = source.pipe(loader.inject(gulp.src(resources[resource]), {
            starttag: "<!--inject:" + resource + "-->"
        }));
    }
    source.pipe(gulp.dest(config.root)).on('end', callback);;
});


gulp.task('inject-lib',  'Inject only libs in the index.html', function (callback) {
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    gulp.src(config.index)
          .pipe(wiredep(options))
          .pipe(loader.inject(gulp.src(config.libs.css))) //inject libs css
          .pipe(gulp.dest(config.root).on('end', callback));
});



gulp.task('templatecache', 'Generate template cache', function () {
    gulp.src(config.app.html)
         .pipe(loader.minifyHtml({
             empty: true,
             conditionals: true
         }))
         .pipe(loader.angularTemplatecache(config.templatecache.file, config.templatecache.options))
         .pipe(gulp.dest(config.templatecache.path));
});


// Compile Tasks
gulp.task('compile-less', 'Compile less', function () {
    return gulp.src(config.app.less.all)
              .pipe(loader.plumber())
              .pipe(loader.changed(config.app.less.dist, { extension: '.css' })) // Keep in the pipeline only changed files
              .pipe(compileLess())
              .pipe(gulp.dest(config.app.less.dist))
              .pipe(loader.if(yargs.livereload, browserSync.stream()));
});