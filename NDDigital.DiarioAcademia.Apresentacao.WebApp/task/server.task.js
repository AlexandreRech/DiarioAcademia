/*
 *
 * SERVER TASKS
 *
 * gulp tasks starting the application
 *
 */

gulp.task('start', 'Start dev app.--livereload: use livereload', ['inject'], function () {
    var options = config.getBrowsersyncOptionsDefault();
    if (!yargs.livereload)
        options.files = [];  // break livereload - no watched files
    browserSync.init(options);
    gulp.watch([config.app.less.all], ['compile-less']);
});

gulp.task('start-publish', 'Start publish version of app optimized', ['build-optimized'], function () {
    //start application
    browserSync.init({
        server: {
            baseDir: "./dist/"   //publish version
        }
    });
});
