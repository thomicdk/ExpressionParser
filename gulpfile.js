var gulp = require("gulp");
var rimraf = require('gulp-rimraf');
var ts = require("gulp-typescript");
var merge = require('merge2');
var concat = require('gulp-concat');
var cleants = require('gulp-clean-ts-extends');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  scripts: ['src/**/*.ts']
};

gulp.task('clean', function () {
    return gulp.src(['dist/**/*'], { read: false })
        .pipe(rimraf());
});

gulp.task('scripts', ['clean'], function() {
    var tsResult = gulp.src(paths.scripts)
                       .pipe(ts({
						   target: "ES5",
                           declarationFiles: false,
                           noExternalResolve: false,
						   module: "commonjs",
						   sortOutput: true,
						   out: 'expression.js'
                       }));
    
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js
			//.pipe(concat('expression.js'))
			.pipe(cleants())
			.pipe(gulp.dest('dist/js'))
			.pipe(uglify())
			.pipe(rename({ suffix: '.min' }))	
			.pipe(gulp.dest('dist/js'))
    ]);
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts']);