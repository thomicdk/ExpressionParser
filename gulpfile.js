var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require('merge2');

var paths = {
  scripts: ['src/**/*.ts']
};

gulp.task('scripts', function() {
    var tsResult = gulp.src(paths.scripts)
                       .pipe(ts({
                           declarationFiles: true,
                           noExternalResolve: true,
						   module: "commonjs"
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