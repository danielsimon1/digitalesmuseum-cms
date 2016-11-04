angular.module('app', [
    'ui.router',
    'app.login',
    'app.persons'
]);
angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: 'src/app/menu/menu.html',
            controller: 'AppCtrl'
        });
    $urlRouterProvider.otherwise("persons");

}).controller('AppCtrl', function ($state, $scope) {

}).run(function ($rootScope) {

}).constant('rootUrl', 'http://it-dmuseum3.dhbw-stuttgart.de:443/');
