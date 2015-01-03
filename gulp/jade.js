var runSequence = require('run-sequence');
var gulp = require('gulp');
var jade = require('gulp-jade');
var notify = require('./notify');

var SRC_PATH = 'src/**/*.jade';
var DST_PATH = 'www/';

gulp.task('jade', function () { return buildJade(true); });
gulp.task('jade-release', function () { return buildJade(false); });
function buildJade(debug) {
    return gulp.src(SRC_PATH)
        .pipe(notify.plumber())
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
