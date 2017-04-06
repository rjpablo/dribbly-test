/// <binding AfterBuild='watch' />
var gulp = require('gulp');

gulp.task('watch',['browserSync'], function () {
    gulp.watch('www/**/*.css', browserSync.reload);
    gulp.watch('www/**/*.html', browserSync.reload);
    gulp.watch('www/js/**/*.js', browserSync.reload);
    // Other watchers
})


var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: 'www',
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        port:8888
    })
})