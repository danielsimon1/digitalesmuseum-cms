angular.module('app')
    .factory('user', function ($q, $http, rootUrl) {
        var service = {};

        service.login = function (username, password) {
            var q = $q.defer();
            var user = {
                username: username,
                password: password
            };
            $http.post(rootUrl + 'login', user)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        return service;
    })

    .factory('persons', function ($q, $http, rootUrl, $log) {
        var service = {};

        service.getAllPersons = function () {
            var q = $q.defer();
            $http.get(rootUrl + 'persons')
                .then(function (response) {
                    var mapped = _mapPersons(response.data);
                    q.resolve(mapped);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        service.addPerson = function (person) {
            var q = $q.defer();
            $http.post(rootUrl + 'persons/add', person)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        service.deletePerson = function (id) {
            var q = $q.defer();
            $http.delete(rootUrl + 'persons/' + id)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        service.deletePerson = function (person, id) {
            var q = $q.defer();
            $http.post(rootUrl + 'persons/' + id, person)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        function _mapPersons(input) {
            var mappedPersons = [];

            angular.forEach(input, function (person) {
                var mappedPerson = {};
                mappedPerson = {
                    vorname: person.vorname,
                    nachname: person.nachname,
                    caption: person.caption,
                    portrait: {
                        url: person.portrait.url,
                        width: person.portrait.width,
                        height: person.portrait.height
                    },
                    chips: _mapChips(person.chips),
                    slides: _mapSlides(person.slides)
                };
                mappedPersons.push(mappedPerson);
            });

            return mappedPersons;
        }

        function _mapChips(chips) {
            var mapped = [];
            angular.forEach(chips, function (chip) {
                var mappedChip = {};
                mappedChip = {
                    letter: chip.letter,
                    text: chip.text
                };
                mapped.push(mappedChip);
            });
            return mapped;
        }

        function _mapSlides(slides) {
            var mapped = [];
            angular.forEach(slides, function (slide) {
                var mappedSlide = {};
                if (slide.type === "DataTile") {
                    mappedSlide = {
                        type: slide.type,
                        payload: slide.payload
                    }
                } else if (slide.type === "ImageTile") {
                    mappedSlide = {
                        type: slide.type,
                        caption: slide.caption,
                        src: {
                            url: slide.src.url,
                            height: slide.src.height,
                            width: slide.src.width
                        }
                    }
                }
                mapped.push(mappedSlide);
            });
            return mapped;
        }

        return service;
    });