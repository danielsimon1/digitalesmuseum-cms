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

    $(document).ready(function () {
        $(".dropdown-button").dropdown();
    });

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

    persons.getAllPersons()
        .then(function (persons) {
            $log.log('persons', persons);
            $scope.data.persons = persons;
        }, function (error) {
            Materialize.toast("Fehler beim Laden der Personen", 4000, 'red rounded');
        });

    $scope.changePerson = function (id) {
        angular.forEach($scope.data.persons, function (person) {
            if (person.id === id) {
                $log.log(person);
                angular.copy(person, $scope.data.selectedPerson);
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
        $scope.data.isTouched = true;
        // check if all is valid
        var isValid = true;
        // local variable for clarity reasons
        var test = $scope.data.selectedPerson;
        $log.log(typeof parseInt(test.portrait.width));
        if (test.firstname && test.lastname && test.caption && test.portrait.url && test.portrait.source && test.portrait.caption && !isNaN(parseInt(test.portrait.width)) && !isNaN(parseInt(test.portrait.height))) {
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
        } else {
            // send to backend
        }
    }
});