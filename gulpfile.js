var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(uglify())
    .pipe(concat('baasic-angular.js'))
    .pipe(gulp.dest('dist'))
	.pipe(uglify())
	.pipe(rename('baasic-angular.min.js'))
	.pipe(gulp.dest('dist'));
});



gulp.task('default', ['scripts']);
