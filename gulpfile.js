/* jshint node: true */
'use strict';

var docgen = require('baasic-javascript-docgen');
var injectVersion = require('gulp-inject-version');
var gulpUtil = require('gulp-util');

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	stylish = require('jshint-stylish');

var paths = {
	scripts: ['src/**/*.js']
};

gulp.task('jshint', function () {
	return gulp.src([
				'gulpfile.js'
			]
			.concat(paths.scripts))
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(stylish));
});

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
		.pipe(plugins.order(['*.moduleDefinition.js', '*.js']))
		.pipe(plugins.concat('baasic-sdk-angularjs.js'))
		.pipe(plugins.replace('api.baasic.local', 'api.baasic.com'))
		.pipe(plugins.header('/*\n Baasic AngularJS SDK %%GULP_INJECT_VERSION%%\n (c) 2014-' + new Date().getFullYear() + ' Mono Ltd.  http://baasic.com\n License: MIT\n*/\n(function (angular, undefined) {\n'))
		.pipe(plugins.footer('\n}(angular));'))
		.pipe(injectVersion())
		.pipe(plugins.beautify())
		.pipe(gulp.dest('dist'))
		.pipe(plugins.uglify({
			output: {
				comments: /^!|License: MIT/i
			}
		}).on('error', gulpUtil.log))
		.pipe(plugins.rename('baasic-sdk-angularjs.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('docs', function () {
	docgen.generateBaasicDocs('src', 'wiki', 'Baasic SDK Navigation', ['config.js'], ['home.md']);
});


//gulp.task('default', ['jshint', 'docs', 'scripts']);
gulp.task('default', ['docs', 'scripts']);