require('es6-shim');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync')
var gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('default', function () {
    runSequence('build', ['serve', 'watch']);
});

gulp.task('clean', function (callback) {
    del(['app', 'tmp'], callback);
});

gulp.task('build', ['jade', 'stylus', 'ts']);
gulp.task('build-release', ['jade-release', 'stylus-release', 'ts-release']);

gulp.task('serve', function () {
    browserSync.init(null , { 
        server: {
            baseDir: 'app/public/'
        }
    });
});

gulp.task('serve-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['jade-watch', 'stylus-watch', 'ts-watch']);
