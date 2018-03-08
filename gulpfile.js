/// <binding AfterBuild='watch' />
var gulp = require('gulp'),
    useref = require('gulp-useref');

gulp.task('html', function () {
    return gulp.src(['./www/**/!(index)*.html'])
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('www/**/*.css', ['js-css']);
    gulp.watch('www/**/*.html', ['html']);
    gulp.watch('www/**/*.js', ['js-css']);
    // Other watchers
})


var browserSync = require('browser-sync').create();

//run app from dist folder
gulp.task('browserSync', function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: 'dist'
        },
        port: 8888
    })
})

//run app using raw files
gulp.task('browserSync-dev', function () {
    browserSync.init({
        server: {
            baseDir: 'www',
            routes: {
                '/bower_components': 'bower_components'
            }
        },
        port: 8888
    })
})

gulp.task('js-css', function () {
    return gulp.src('www/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function () {
    return gulp.src(['www/images/**/*.ico', 'www/images/**/*.png', 'www/images/**/*.jpg'])
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('fonts', function () {
    return gulp.src(['www/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('htaccess', function () {
    return gulp.src(['./www/.htaccess'])
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//compile files 
gulp.task('build', function () {
    gulp.start(['html', 'js-css', 'fonts', 'htaccess', 'images'])
});

//run app without minifying scripts and css
gulp.task('serve-dev', function () {
    gulp.start(['browserSync-dev', 'watch'])
});

//run compiled app from dist folder
gulp.task('serve-prod', function () {
    gulp.start(['build', 'browserSync', 'watch'])
});

//rum uncompiled app but also compile app into dist folder
gulp.task('serve-dev+build', function () {
    gulp.start(['browserSync-dev', 'watch', 'build'])
});