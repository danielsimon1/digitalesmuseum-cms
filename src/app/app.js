angular.module('app', [
    'ui.router',
    'app.login'
]);
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: 'src/app/menu/menu.html',
            controller: 'AppCtrl'
        });
    $urlRouterProvider.otherwise("/");

}).controller('AppCtrl', function ($state, $scope) {

}).run(function ($rootScope) {

}).constant('rootUrl', 'test');
