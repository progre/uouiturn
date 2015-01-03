var path = require('path');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');

exports.plumber = function () {
    return plumber({
        errorHandler: function (err) {
            console.error(err.message);
            notify(err.plugin, err.message);
        }
    });
};

exports.tsReporter = {
    error: function (err) {
        console.error(err.message);
        notify(
            'TypeScript compile',
            err.message.replace(/\u001b\[\d+m/g, '').replace('): ', '):\n'));
    }
};

exports.tsLintReporter = function (failures, file) {
    failures.forEach(function(failure) {
        var message = path.relative('', file.path)
            + '(' + (failure.startPosition.line + 1) + ','+ (failure.startPosition.character + 1) + ')'
            + ': ' + failure.failure;
        console.error(message);
        notify('TypeScript lint', message.replace('): ', '):\n '));
    });
};

function notify(title, message) {
    notifier.notify({
        title: title,
        message: message,
        sound: true
    });
}
