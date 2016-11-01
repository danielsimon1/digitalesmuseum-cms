angular.module('app')
    .factory('user', function ($q, $http, rootUrl) {
        var service = {};

        service.login = function (username, password) {
            var q = $q.defer();
            var user = {
                username: username,
                password: password
            };
            $http.post(rootUrl + '/login', user)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        return service;
    });