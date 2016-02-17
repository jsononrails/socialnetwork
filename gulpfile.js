var path 		= require('path');
var gulp 		= require('gulp');
var less 		= require('gulp-less');
var rename 		= rename('gulp-rename');
var minifyCSS 	= require('gulp-minify-css');
var browserify	= require('gulp-browserify');
var uglify 		= require('gulp-uglify');
var Ractive 	= require('ractive');
var tap 		= require('gulp-tap');

// gather and compress js files
gulp.task('js', function() {
	gulp.src('./js/app.js')
	.pipe(browserify())
	.pipe(gulp.dest('./static/js'))
	.pip(uglify())
	.pipe.rename({suffix: 'min'})
	.pipe(gulp.dest('./static/js'));
});

// minify css
gulp.task('css', function() {
	gulp.src('./less/styles.less')
	.pipe(less({
		paths: [path.join(__direname, 'less', 'includes')]
	}));
	.pipe(gulp.dest('./static/css'))
	.pipe(minifyCSS({keepBreaks:true}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./static/css'));
});

// templating
gulp.task('templates', function() {
	gulp.src('./tpl/**/*.html')
	pipe(tap(function(file, t) {
		var precompiled = Ractive.parse(file.contents.toString());
		precompiled = JSON.stringify(precompiled);
		file.contents = new Buffer('module.exports = ' + precompiled);
	}))
	.pipe(rename(function(path) {
		path.extname = '.js';
	}))
	.pipe(gulp.dest('./frontend/tpl'));
});

gulp.task('watchers', function() {
	gulp.watch('less/**/*.less', ['css']);
});

gulp.task('default', ['css', 'templates', 'js', 'watchers']);