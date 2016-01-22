/*
 *  
 * BUILD TASKS 
 * 
 * gulp tasks that do build optimized application
 * 
 */

gulp.task('build-optimized', 'Build of application optimized', ['inject', 'build-resources', 'build-json'], function () {
    var builder = loader.useref.assets({ searchPath: "./" });
    var cssFilter = loader.filter('**/*.css', { restore: true });
    var jsAppFilter = loader.filter('**/app.js', { restore: true });
    var jsLibsFilter = loader.filter('**/libs.js', { restore: true });
    return gulp.src(config.index)
              .pipe(builder) //verify the tags 'build' and generate the builds
              //css
              .pipe(cssFilter)
              .pipe(loader.csso()) // css optimize
              .pipe(cssFilter.restore)
              //libs js
              .pipe(jsLibsFilter)
              .pipe(loader.ngAnnotate()) // $inject
              .pipe(loader.uglify()) // minify
              .pipe(jsLibsFilter.restore)
              //app js
              .pipe(jsAppFilter)
              .pipe(loader.ngAnnotate()) // $inject
              .pipe(loader.uglify()) // minify
              .pipe(jsAppFilter.restore)
              .pipe(builder.restore())
              .pipe(loader.useref())  // define build in index
              .pipe(gulp.dest(config.dist.root));
});


gulp.task('build-resources', 'Publish of resources used by application', function (done) {
    //fonts
    gulp.src(config.fonts)
                .pipe(gulp.dest(config.dist.font));
    //views
    gulp.src(config.app.html)
                .pipe(loader.minifyHtml({
                    conditionals: true
                }))
                .pipe(gulp.dest(config.dist.app));
    //images
    gulp.src(config.app.images)
                .pipe(loader.imagemin({
                    progressive: true, //jpg
                    interlaced: true, //gif
                    optipng: true, // png
                    optmizationLevel: 7  // 0 - 7
                }))
                .pipe(gulp.dest(config.dist.app).on('end', done));
});

gulp.task('build-json', 'Deploy of json', function () {
    gulp.src(config.app.json)
                .pipe(gulp.dest(config.dist.app));
});