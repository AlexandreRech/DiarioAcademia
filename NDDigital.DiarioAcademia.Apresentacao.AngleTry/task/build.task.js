/*
 *  
 * BUILD TASKS 
 * 
 * gulp tasks that do build optimized application
 * 
 */


gulp.task('build', 'Build of application optimized', gulpsync.sync(['clean-dist', "vendor-lazy", 'inject',
    ['build-images', 'build-lazy-css', 'build-lazy-js', 'build-fonts', 'build-json', 'build-html']]), function () {

    var builder = loader.useref.assets({ searchPath: "./" });
    var cssFilter = loader.filter('**/*.css', { restore: true });
    var jsAppFilter = loader.filter('**/app.js', { restore: true });
    var jsLibsFilter = loader.filter('**/libs.js', { restore: true });

    return gulp.src(config.index)
              .pipe(builder) //verify the tags 'build' and generate the builds
              //all css in index
              .pipe(cssFilter)
              .pipe(loader.stripCssComments({ all: true }))
              .pipe(loader.csso()) // css optimize
              .pipe(cssFilter.restore())
              //libs js
              .pipe(jsLibsFilter)
              .pipe(loader.ngAnnotate()) // $inject
              .pipe(loader.uglify()) // minify
              .pipe(jsLibsFilter.restore())
              //app js
              .pipe(jsAppFilter)
              .pipe(loader.ngAnnotate()) // $inject
              .pipe(loader.uglify()) // minify
              .pipe(jsAppFilter.restore())
              .pipe(builder.restore())
              .pipe(loader.useref())  // define build in index
              .pipe(gulp.dest(config.dist.root));
});


gulp.task('build-html', 'Optimized construction of html files', function (done) {
    gulp.src(config.app.html)
                .pipe(loader.minifyHtml({
                    conditionals: true
                }))
                .pipe(gulp.dest(config.dist.src.root)).on('end', done);
});


gulp.task('build-lazy-js', 'Optimized construction of css files in lazy load', function () {
    var resources = config.app.js.lazy;
    for (var res in resources) {
        gulp.src(resources[res].src)
             .pipe(loader.ngAnnotate()) // $inject
             .pipe(loader.uglify()) // minify
            .pipe(gulp.dest(resources[res].dist));
    }
});

gulp.task('build-lazy-css', 'Optimized construction of js files in lazy load', function () {
    var resources = config.app.css.lazy;
    for (var res in resources) {
        gulp.src(resources[res].src)
            .pipe(loader.stripCssComments({ all: true }))
            .pipe(loader.csso()) // css optimize
            .pipe(gulp.dest(resources[res].dist));
    }   
});

gulp.task('build-images', 'Publish Optimized Images', function (done) {
    gulp.src(config.app.images)
                .pipe(loader.imagemin({
                    progressive: true, //jpg
                    interlaced: true, //gif
                    optipng: true, // png
                    optmizationLevel: 7  // 0 - 7
                }))
                .pipe(gulp.dest(config.dist.src.images).on('end', done));
});

gulp.task('build-fonts', 'Deploy of fonts', function () {
    gulp.src(config.app.fonts.all)
                .pipe(gulp.dest(config.dist.src.root));

    gulp.src(config.app.fonts.bootstrap)
             .pipe(gulp.dest(config.dist.src.fonts));
});

gulp.task('build-json', 'Deploy of json', function () {
    gulp.src(config.app.json)
                .pipe(gulp.dest(config.dist.src.root));
});