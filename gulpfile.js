var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var path = require('path'); 

var paths = {  
  sass: ['./www/dev/css/*.scss'],
  pug: ['./www/dev/*.pug'],
  js: ['./www/dev/js/*.js']
};    

gulp.task('default', ['sass', 'pug', 'js', 'watch']);  

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./www/prod/css'));
});

gulp.task('pug', function(done) {  
  gulp.src(paths.pug)
    .pipe(pug())
    .pipe(gulp.dest('./www/prod/'))
    .on('end', done);
});

gulp.task('js', function() {  
  gulp.src(paths.js)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('./www/prod/js'));
});

gulp.task('watch', function() {  
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.js, ['js']);
});