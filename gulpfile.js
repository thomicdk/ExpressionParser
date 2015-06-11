var gulp = require("gulp");
var rimraf = require('gulp-rimraf');
var ts = require("gulp-typescript");
var merge = require('merge2');

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
                           declarationFiles: true,
                           noExternalResolve: true,
						   module: "commonjs",
						   sortOutput: true
                       }));
    
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js.pipe(gulp.dest('dist/js'))
    ]);
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts']);