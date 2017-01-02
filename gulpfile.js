var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var path = require('path'); 

var paths = {  
  sass: ['./comp/sass/*.scss'],
  pug: ['./comp/pug/*.pug']
};    

gulp.task('default', ['sass', 'pug', 'watch']);  

gulp.task('sass', function () {
  return gulp.src('./comp/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./builds/dev/css'));
});

gulp.task('pug', function(done) {  
  gulp.src('./comp/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./builds/dev/'))
    .on('end', done);
});

gulp.task('watch', function() {  
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pug, ['pug']);
});