angular.module('app.login', [
]);
angular.module('app.login').config(function ($stateProvider) {
    $stateProvider
        .state('app.login', {
            url: 'login',
            templateUrl: 'src/app/login/login.html',
            controller: 'LoginCtrl'
        });
}).controller('LoginCtrl', function ($scope, user, $log, $state, $rootScope, localStorageService) {
    $scope.data = {};
    localStorageService.clearAll();
    $rootScope.$emit('logout');
    $scope.login = function () {
        if ($scope.data.username && $scope.data.password) {
            localStorageService.set('user', {
                username: $scope.data.username,
                password: $scope.data.password
            });
            user.login($scope.data.username, $scope.data.password)
                .then(function (response) {
                    // login success
                    Materialize.toast("Login war erfolgreich", 4000, 'green rounded');
                    $rootScope.$emit('login-succ');
                    localStorageService.set('login', true);
                    $state.go('app.persons');
                }, function (error) {
                    Materialize.toast("Fehler beim Login", 4000, 'red rounded');
                    $log.error(error);
                });
        } else {
            Materialize.toast("Bitte füllen Sie alle Felder aus!", 4000);
        }
    };
});