/// <reference path="../../typings.d.ts" />
import PromiseCommand = require('./lib/promisecommand');
import recruit = require('./infrastructure/recruit');

var app = angular.module('app', ['ionic']);

app.config([
    '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $ionicConfigProvider: any) => {
        $ionicConfigProvider.views.maxCache(0);

        $stateProvider
            .state('signin',
            {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            .state('tabs',
            {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('home',
            {
                url: '/home',
                //views: {
                //'home-tab': {
                templateUrl: 'templates/home.html',
                controller: 'HomeTabCtrl'
                //}
                //}
            })
            .state('tabs.facts',
            {
                url: '/facts',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/facts.html'
                    }
                }
            })
            .state('tabs.facts2',
            {
                url: '/facts2',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/facts2.html'
                    }
                }
            })
            .state('tabs.about',
            {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/about.html'
                    }
                }
            })
            .state('tabs.navstack',
            {
                url: '/navstack',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/nav-stack.html'
                    }
                }
            })
            .state('tabs.contact',
            {
                url: '/contact',
                views: {
                    'contact-tab': {
                        templateUrl: 'templates/contact.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/sign-in');
    }]);

app.controller('SignInCtrl', [
    '$scope', '$timeout', '$state', '$ionicPopup',
    ($scope: any, $timeout: ng.ITimeoutService, $state: any, $ionicPopup: any) => {
        $scope.signIn = new PromiseCommand($scope,
            (...args: any[]) => {
                console.log(args);
                return new Promise((resolve, reject) => {
                    // サーバーにアクセス
                    $timeout(() => {
                        if (false) {
                            $ionicPopup.show({
                                title: 'ログインに失敗しました',
                                subTitle: 'IDとパスワードが正しいか、またはネットワークが正常か確認してください',
                                scope: $scope,
                                buttons: [{
                                    text: 'OK',
                                    type: 'button-positive'
                                }]
                            });
                            reject(null);
                            return;
                        }
                        $state.transitionTo('home', {}, { reload: true });
                        resolve();
                    }, 2 * 1000);
                });
            },
            (...args: any[]) => {
                return true;
            });
    }]);

app.controller('HomeTabCtrl', [
    '$scope', '$http',
    ($scope: any, $http: ng.IHttpService) => {
        recruit.getRecruits($http);
        $scope.items = [1, 2, 3, 4, 5];
        console.log('HomeTabCtrl');
    }]);

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
