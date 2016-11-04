angular.module('app.persons', []);
angular.module('app.persons').config(function ($stateProvider) {
    $stateProvider
        .state('app.persons', {
            url: 'persons',
            templateUrl: 'src/app/persons/persons.html',
            controller: 'PersonsCtrl'
        });
}).controller('PersonsCtrl', function ($scope, persons, $log) {
    $scope.data = {};
    $scope.data.selectedPerson = {};
    $scope.editMode = false;
    $scope.data.isTouched = false;
    $log.log($scope.data.selectedPerson);
    $log.log(Object.keys($scope.data.selectedPerson).length);

    $(document).ready(function () {
        $(".dropdown-button").dropdown();
        $(".modal").modal();
    });

    function loadPersons() {
        persons.getAllPersons()
            .then(function (persons) {
                $log.log('persons', persons);
                $scope.data.persons = persons;
            }, function (error) {
                Materialize.toast("Fehler beim Laden der Personen", 4000, 'red rounded');
            });
    }
    loadPersons();

    $scope.newPerson = function () {
        $scope.data.selectedPerson = {
            firstname: "",
            lastname: "",
            caption: "",
            portrait: {
                url: "",
                width: "",
                height: "",
                caption: "",
                source: ""
            },
            chips: [],
            imageTiles: [],
            dataTiles: []
        };
        $scope.editMode = true;
    };

    $scope.changePerson = function (id) {
        angular.forEach($scope.data.persons, function (person) {
            if (person.id === id) {
                $log.log(person);
                angular.copy(person, $scope.data.selectedPerson);
            }
        });
    };

    $scope.deletePerson = function () {
        var id = $scope.data.selectedPerson.id;
        if (id) {
            persons.deletePerson(id)
                .then(function () {
                    $scope.data.selectedPerson = {};
                    Materialize.toast("Die Person wurde erfolgreich gelöscht.", 4000, "rounded green");
                    loadPersons();
                }, function () {
                    Materialize.toast("Fehler beim Löschen der Person.", 4000, "rounded red");
                });
        } else {
            Materialize.toast("Diese Person wurde noch nicht gespeichert. Um sie zu löschen, laden Sie die Seite neu.", 8000);
        }
    };

    $scope.toggleEditMode = function () {
        $scope.editMode ? $scope.editMode = false : $scope.editMode = true;
    };

    $scope.addChip = function () {
        $scope.data.selectedPerson.chips.push({
            letter: $scope.data.newChip.substring(0, 1).toUpperCase(),
            text: $scope.data.newChip
        });
        $scope.data.newChip = "";
    };

    $scope.removeChip = function (inputChip) {
        angular.forEach($scope.data.selectedPerson.chips, function (compareChip) {
            if (angular.equals(inputChip, compareChip)) {
                var index = $scope.data.selectedPerson.chips.indexOf(compareChip);
                $scope.data.selectedPerson.chips.splice(index, 1);
            }
        })
    };

    $scope.removeDataTile = function (inputTile) {
        angular.forEach($scope.data.selectedPerson.dataTiles, function (compareTile) {
            if (angular.equals(inputTile, compareTile)) {
                var index = $scope.data.selectedPerson.dataTiles.indexOf(compareTile);
                $scope.data.selectedPerson.dataTiles.splice(index, 1);
            }
        });
    };
    $scope.removeImageTile = function (inputTile) {
        angular.forEach($scope.data.selectedPerson.imageTiles, function (compareTile) {
            if (angular.equals(inputTile, compareTile)) {
                var index = $scope.data.selectedPerson.imageTiles.indexOf(compareTile);
                $scope.data.selectedPerson.imageTiles.splice(index, 1);
            }
        });
    };

    $scope.newDataTile = function () {
        $scope.data.selectedPerson.dataTiles.push({
            button_text: "",
            long_text: "",
            short_text: ""
        });
    };

    $scope.newImageTile = function () {
        $scope.data.selectedPerson.imageTiles.push({
            url: "",
            source: "",
            caption: "",
            width: 0,
            height: 0
        });
    };

    $scope.save = function () {
        $scope.isTouched = true;
        // check if all is valid
        var isValid = true;
        // local variable for clarity reasons
        var test = $scope.data.selectedPerson;
        $log.log(typeof parseInt(test.portrait.width));
        if (test.firstname && test.lastname && test.caption && test.portrait.url && test.portrait.source && test.portrait.caption && !isNaN(parseInt(test.portrait.width)) && !isNaN(parseInt(test.portrait.height)) && test.chips.length > 0 && test.imageTiles.length > 0) {
            // DataTiles
            angular.forEach(test.dataTiles, function (tile) {
                if (tile.button_text && tile.long_text && tile.short_text) {
                    // all good
                } else {
                    $log.warn("DataTileError");
                    isValid = false;
                }
            });
            // ImageTiles
            angular.forEach(test.imageTiles, function (tile) {
                if (tile.url && tile.source && tile.caption && !isNaN(parseInt(tile.width)) && !isNaN(parseInt(tile.height))) {
                    // all good
                } else {
                    $log.warn("ImageTileError");
                    isValid = false;
                }
            });
            // Chips
            angular.forEach(test.chips, function (chip) {
                if (chip.letter && chip.text) {
                    // all good
                } else {
                    isValid = false;
                }
            })
        } else {
            $log.warn("GeneralError");
            isValid = false;
        }
        if (!isValid) {
            Materialize.toast("Fehlende oder fehlerhafte Angaben!", 4000, "red rounded");
            $scope.editMode = true;
        } else {
            // send to backend
            if (test.id) {
                // update existing
                persons.updatePerson($scope.data.selectedPerson)
                    .then(function () {
                        Materialize.toast("Speichern war erfolgreich!", 4000, "green rounded");
                    }, function (error) {
                        Materialize.toast("Speichern war nicht erfolgreich!", 4000, "red rounded");
                    });
            } else {
                // create new
                persons.addPerson($scope.data.selectedPerson)
                    .then(function (response) {
                        Materialize.toast("Speichern war erfolgreich!", 4000, "green rounded");
                        $scope.data.selectedPerson.id = response.id;
                        loadPersons();
                    }, function (error) {
                        Materialize.toast("Speichern war nicht erfolgreich!", 4000, "red rounded");
                    });
            }
        }
    };

    // checks if object is empty
    $scope.isEmpty = function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    // checks if number is int and >= 0
    $scope.isValidNumber = function (num) {
        num = parseInt(num);
        if (!isNaN(num)) {
            return num >= 0;
        } else {
            return false;
        }
    }
});