var gulp = require('gulp');
var bowerFiles=require('main-bower-files');
var bower = require('gulp-bower');
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});

//console.log(bowerFiles())
