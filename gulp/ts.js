var fs = require('fs');
var runSequence = require('run-sequence');
var del = require('del');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var requirejs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var tslint = require('gulp-tslint');
var notify = require('./notify');

var CLIENT_SRC_PATH = 'src/ts/**/*.ts';
var CLIENT_DST_PATH = 'www/js/';
var CLIENT_TMP_PATH = 'tmp/js/';
var SERVER_SRC_PATH = null;
var SERVER_DST_PATH = null;

gulp.task('ts', ['ts-client']);
gulp.task('ts-release', ['ts-requirejs']);

gulp.task('ts-server', function () { return buildTS(true, true); });
gulp.task('ts-client', function () { return buildTS(false, true); });
gulp.task('ts-server-release', ['ts-server-clean'], function () { return buildTS(true, false); });
gulp.task('ts-client-release', ['ts-client-clean'], function () { return buildTS(false, false); });
function buildTS(server, debug) {
    var src = server ? SERVER_SRC_PATH : CLIENT_SRC_PATH;
    var module = server ? 'commonjs' : 'amd';
    var dest = server ? SERVER_DST_PATH : debug ? CLIENT_DST_PATH : CLIENT_TMP_PATH;
    return gulp.src(src)
        .pipe(tslint())
        .pipe(tslint.report(notify.tsLintReporter, { emitError: false }))
        .pipe(gulpIf(debug, sourcemaps.init()))
        .pipe(typescript({ module: module, noImplicitAny: true }, undefined, notify.tsReporter))
        .pipe(gulpIf(debug, sourcemaps.write()))
        .pipe(gulp.dest(dest));
}

gulp.task('ts-watch', function () {
    gulp.watch(SERVER_SRC_PATH, function () {
        runSequence('ts-server', 'serve-reload');
    });
    gulp.watch(CLIENT_SRC_PATH, function () {
        runSequence('ts-client', 'serve-reload');
    });
});

gulp.task('ts-server-clean', function (callback) {
    del(SERVER_DST_PATH, callback);
});
gulp.task('ts-client-clean', function (callback) {
    del([CLIENT_TMP_PATH, CLIENT_DST_PATH], callback);
});

gulp.task('ts-requirejs', ['ts-client-release'], function () {
    var entryPoint = 'main';
    return requirejs({
        baseUrl: CLIENT_TMP_PATH,
        mainConfigFile: CLIENT_TMP_PATH + 'config.js',
        name: entryPoint,
        out: entryPoint + '.js'
    })
        // .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(CLIENT_DST_PATH));
});
