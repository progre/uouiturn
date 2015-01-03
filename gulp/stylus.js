var runSequence = require('run-sequence');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var notify = require('./notify');

var SRC_PATH = 'src/public/stylus/**/*.stylus';
var DST_PATH = 'app/public/css/';

gulp.task('stylus', function () { return buildStylus(true); });
gulp.task('stylus-release', function () { return buildStylus(false); });
function buildStylus(debug) {
    return gulp.src(SRC_PATH)
        .pipe(notify.plumber())
        .pipe(stylus({
          sourcemap: { inline: true }
        }))
        .pipe(gulp.dest(DST_PATH));
}

gulp.task('stylus-watch', function () {
    gulp.watch(SRC_PATH, function () {
        runSequence('stylus', 'serve-reload');
    });
});
