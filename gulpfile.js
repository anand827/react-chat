//Gulp Congiguration
//Variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
//sass
gulp.task('sass', function() {
    gulp.src('/public/css/site/*.scss')
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
        .on('error', reportError)
});
//live reload
gulp.task('reload', function() {
    browserSync.init({
        //proxy: "/",
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('public/css/site/**/*.scss', ['sass']);
    gulp.watch(['public/css/style.css', 'public/js/site/*.js', '*.html']).on('change', browserSync.reload);
});
//Default task
gulp.task('default', function() {
    gulp.watch('css/site/**/*.scss', ['sass']);
    gulp.watch('public/css/site/**/*.scss', ['sass']);
});
//Error function
function reportError(error) {
    console.log(error.toString());
}