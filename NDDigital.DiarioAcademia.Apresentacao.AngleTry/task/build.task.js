/*
 *  
 * BUILD TASKS 
 * 
 * gulp tasks that do build optimized application
 * 
 */

gulp.task('build', 'Build of application optimized', gulpsync.sync(['clean-dist', 'inject',
    ['build-images', 'build-lazy-css', 'build-lazy-js', 'build-fonts', 'build-json', 'build-vendor', 'build-html']]), function () {

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
                  .pipe(gulp.dest(config.dist.root).on('end', function () {
                      gulp.src(config.dist.root + "index.html")
                            .pipe(loader.minifyHtml({
                                conditionals: true
                            }))
                            .pipe(gulp.dest(config.dist.root));
                  }));
    });


gulp.task('build-html', 'Optimized construction of html files', function (done) {
    gulp.src(config.app.html)
                .pipe(loader.minifyHtml({
                    conditionals: true
                }))
                .pipe(gulp.dest(config.dist.src.root)).on('end', done);
});


gulp.task('build-lazy-js', 'Optimized construction of css files in lazy load', function () {
    var resources = require("../src/lazy-resources.json");
    for (var res in resources) {
        var destPath = config.dist.root + resources[res].substring(0, resources[res].lastIndexOf("/"));
        gulp.src(resources[res])
             .pipe(loader.ngAnnotate()) // $inject
             .pipe(loader.uglify()) // minify
             .pipe(gulp.dest(destPath));
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

gulp.task('build-vendor', 'Optimized construction of vendor files in build', ["vendor-lazy"], function () {
    var cssFilter = loader.filter('**/*.css', { restore: true });
    var jsFilter = loader.filter('**/*.js', { restore: true });

    gulp.src(config.app.vendor.all)
            .pipe(cssFilter)
            .pipe(loader.stripCssComments({ all: true }))
            .pipe(loader.csso()) // css optimize
            .pipe(cssFilter.restore())
            .pipe(jsFilter)
            .pipe(loader.ngAnnotate()) // $inject
            .pipe(loader.uglify()) // minify
            .pipe(jsFilter.restore())
            .pipe(gulp.dest(config.dist.src.vendor));

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

gulp.task('build-fonts', 'Deploy of fonts', ["build-fonts-dev"], function () {
    gulp.src(config.app.fonts.fontawesome)
                .pipe(gulp.dest(config.dist.src.fonts + "font-awesome/"));

    gulp.src(config.app.fonts.bootstrap)
             .pipe(gulp.dest(config.dist.src.fonts + "bootstrap/"));
});

gulp.task('build-json', 'Deploy of json', function () {
    gulp.src(config.app.json)
                .pipe(gulp.dest(config.dist.src.root));
});

gulp.task('build-fonts-dev', 'Deploy of fonts in dev', ["clean-fonts"], function (callback) {
    gulp.src(config.libs.fonts.bootstrap)
                .pipe(gulp.dest(config.app.fonts.all + "bootstrap/"));

    gulp.src(config.libs.fonts.fontawesome)
               .pipe(gulp.dest(config.app.fonts.all + "font-awesome/").on('end', callback));
});
