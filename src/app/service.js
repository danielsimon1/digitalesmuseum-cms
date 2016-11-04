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
            $http.get(rootUrl + 'person')
                .then(function (response) {
                    var mapped = _mapPersons(response.data.persons);
                    q.resolve(mapped);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        service.addPerson = function (person) {
            var q = $q.defer();
            $http.post(rootUrl + 'person/add', person)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        service.updatePerson = function (person) {
            var q = $q.defer();
            $http.put(rootUrl + 'person/' + person.id, person)
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
            $http.post(rootUrl + 'person/' + id, person)
                .then(function (response) {
                    q.resolve(response.data);
                }, function (error) {
                    q.reject(error);
                });
            return q.promise;
        };

        function _mapPerson(person) {
            var mappedPerson = {};
            mappedPerson = {
                id: person.id,
                firstname: person.firstname,
                lastname: person.lastname,
                caption: person.caption,
                portrait: {
                    url: person.portrait[0].url,
                    width: person.portrait[0].width,
                    height: person.portrait[0].height,
                    caption: person.portrait[0].caption,
                    source: person.portrait[0].source
                },
                chips: _mapChips(person.chips),
                dataTiles: _mapDataTiles(person.dataTiles),
                imageTiles: _mapImageTiles(person.imageTiles)
            };
            return mappedPerson;
        }

        function _mapPersons(input) {
            var mappedPersons = [];
            angular.forEach(input, function (person) {
                mappedPersons.push(_mapPerson(person));
            });
            return mappedPersons;
        }

        function _mapDataTiles(tiles) {
            var mapped = [];
            angular.forEach(tiles, function (tile) {
                var mappedTile = {};
                mappedTile = {
                    button_text: tile.button_text,
                    long_text: tile.long_text,
                    short_text: tile.short_text
                };
                mapped.push(mappedTile);
            });
            return mapped;
        }

        function _mapImageTiles(tiles) {
            var mapped = [];
            angular.forEach(tiles, function (tile) {
                var mappedTile = {};
                mappedTile = {
                    url: tile.url,
                    source: tile.source,
                    caption: tile.caption,
                    width: tile.width,
                    height: tile.height
                };
                mapped.push(mappedTile);
            });
            return mapped;
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

        return service;
    });