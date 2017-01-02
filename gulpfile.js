var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    path = require('path'); 

var paths = {  
  sass: ['./www/dev/css/*.scss'],
  pug: ['./www/dev/*.pug'],
  js: ['./www/dev/js/*.js']
};    

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./www/prod/css'))
    .pipe(connect.reload());
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

gulp.task('default', ['sass', 'pug', 'js', 'connect','watch']);  

gulp.task('connect', function() {
  connect.server({
    root: './www/prod/',
    livereload: true
  });
});