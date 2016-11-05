angular.module('app', [
    'ui.router',
    'LocalStorageModule',
    'app.login',
    'app.persons'
]);
angular.module('app').config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: 'src/app/menu/menu.html',
            controller: 'AppCtrl'
        });
    $urlRouterProvider.otherwise("login");
    localStorageServiceProvider.setPrefix('digitalesmuseum-cms');

}).controller('AppCtrl', function ($rootScope, $scope, localStorageService, $state) {
    $scope.isLogin = localStorageService.get('login') || false;
    if ($scope.isLogin && $state.current.name !== "app.persons") {
        $state.go('app.persons');
    } else if (!$scope.isLogin && $state.current.name === "app.persons") {
        $state.go('app.login');
    }
    $rootScope.$on('login-succ', function () {
        $scope.isLogin = true;
    });
    $rootScope.$on('logout', function () {
        $scope.isLogin = false;
    });
}).run(function ($rootScope) {

}).constant('rootUrl', 'http://it-dmuseum3.dhbw-stuttgart.de:443/');
