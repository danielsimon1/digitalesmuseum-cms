angular.module('app.login', [
]);
angular.module('app.login').config(function ($stateProvider) {
    $stateProvider
        .state('app.login', {
            url: 'login',
            templateUrl: 'src/app/login/login.html',
            controller: 'LoginCtrl'
        });
}).controller('LoginCtrl', function () {});