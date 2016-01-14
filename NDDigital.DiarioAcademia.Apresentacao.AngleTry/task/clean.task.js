/*
 *
 * CLEAN TASKS
 *
 * gulp tasks cleaning the deploy
 *
 */

gulp.task('clean-dist','Clean the paste dist' ,function (callback) {
    del(config.clean.dist.all, { force: true }, callback);
});

gulp.task('clean-css', 'Clean all css of paste css', function (callback) {
    del(config.clean.dist.css, { force: true }, callback);

});

gulp.task('clean-vendor', 'Clean all css of paste css', function (callback) {
    del(config.clean.vendor, { force: true }, callback);
});

gulp.task('clean-fonts', 'Clean all fonts of paste fonts', function (callback) {
    del(config.app.fonts.all, { force: true }, callback);
});
