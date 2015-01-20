/// <reference path="../../typings.d.ts" />
import service = require('./service');

service();

var app = angular.module('app', ['ionic']);

function bootstrap() {
    if (document.readyState !== 'interactive' && document.readyState !== 'complete') {
        return false;
    }
    angular.bootstrap(document, [app.name]);
    return true;
}
if (!bootstrap()) {
    document.onreadystatechange = bootstrap;
}
