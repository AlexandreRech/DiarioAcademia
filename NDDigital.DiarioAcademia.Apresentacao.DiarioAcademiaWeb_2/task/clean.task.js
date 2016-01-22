/*
 *
 * CLEAN TASKS
 *
 * gulp tasks cleaning the deploy
 *
 */

gulp.task('clean-dist','Clean the paste dist' ,function (callback) {
    log('Cleaning: dist all files');
    del(config.dist.all, { force: true }, callback);
});

gulp.task('clean-js', 'Clean all js of paste dist', function (callback) {
    log('Cleaning: dist js');
    del(config.dist.js, { force: true }, callback);
});

gulp.task('clean-css', 'Clean all css of paste dist', function (callback) {
    log('Cleaning: dist css');
    del(config.dist.css, { force: true }, callback);
});

gulp.task('clean-html', 'Clean all html of paste dist', function (callback) {
    log('Cleaning: dist html');
    del(config.dist.html, { force: true }, callback);
});