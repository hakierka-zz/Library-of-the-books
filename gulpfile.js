/**
 * Created by Hakierka on 15.12.2015.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');


gulp.task('task_name', function() {

    return gulp.src('js/*.js').pipe(gulp.dest('dest_js'));

});

//LintTask
gulp.task('lint',function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//Scripts

gulp.task('scripts', function() {

    return gulp.src('js/*.js')

        .pipe(concat('all.js'))

        .pipe(gulp.dest('dist'))

        .pipe(rename('all.min.js'))

        .pipe(uglify())

        .pipe(gulp.dest('dist'));

});
//Sass

gulp.task('sass', function() {

    return gulp.src('style/*.scss')

        .pipe(sass())

        .pipe(gulp.dest('css'));

});

//watch

gulp.task('watch', function() {

    gulp.watch('js/*.js', ['lint', 'scripts']);

    gulp.watch('scss/*.scss', ['sass']);

});







gulp.task('default', ['lint', 'scripts']);