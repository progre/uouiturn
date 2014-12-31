var runSequence = require('run-sequence');
var gulp = require('gulp');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');

var SRC_PATH = 'src/public/**/*.jade';
var DST_PATH = 'app/public/';

gulp.task('jade', function () { return jadeTask(true); });
gulp.task('jade-release', function () { return jadeTask(false); });
function jadeTask(debug) {
    return gulp.src(SRC_PATH)
        .pipe(plumber())
        .pipe(jade({ data: {
            debug: debug,
             base: ''
        } }))
        .pipe(gulp.dest(DST_PATH));
}

gulp.task('jade-watch', function () {
    gulp.watch(SRC_PATH, function () {
        runSequence('jade', 'serve-reload');
    });
});
