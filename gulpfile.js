var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleInit.js", "!*.moduleDefinition.js", "*.js", "*.moduleDefinition.js"]))
	.pipe(plugins.concat('baasic-angular.js'))
    .pipe(gulp.dest('dist'))
	.pipe(plugins.uglify())
	.pipe(plugins.rename('baasic-angular.min.js'))
	.pipe(gulp.dest('dist'));
});



gulp.task('default', ['scripts']);
