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
    $scope.toggleEditMode = function () {
        $scope.editMode ? $scope.editMode = false : $scope.editMode = true;
    };
    $scope.addChip = function () {
        $scope.data.selectedPerson.chips.push({
            letter: $scope.data.newChip.substring(0,1).toUpperCase(),
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
    $scope.removeSlide = function (inputSlide) {
        angular.forEach($scope.data.selectedPerson.slides, function (compareSlide) {
            if (angular.equals(inputSlide, compareSlide)) {
                var index = $scope.data.selectedPerson.slides.indexOf(compareSlide);
                $scope.data.selectedPerson.slides.splice(index, 1);
            }
        });
    };
    $(document).ready(function () {
        $(".dropdown-button").dropdown();
        $('.modal').modal();
    });
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
                angular.copy(person, $scope.data.selectedPerson);
            }
        });
    };
    $scope.newTile = function (type) {
        if (type === "ImageTile") {
            $scope.data.selectedPerson.slides.push({
                type: type,
                caption: "",
                src: {
                    url: "",
                    height: 0,
                    width: 0
                }
            });
        } else if (type === "DataTile") {
            $scope.data.selectedPerson.slides.push({
                type: type,
                payload: ""
            });
        }
    };
    //test data
    $scope.data.persons = [
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 3,
            portrait: {
                url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg",
                width: "707px", height: "919px"
            },
            chips: [
                {letter: "A", text: "Awesome Guy"},
                {letter: "C", text: "Computer Scientist"}
            ],
            slides: [
                {type: "DataTile", payload: "Born on the moon"},
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x400", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                }
            ]
        },
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 1,
            portrait: {
                url: "http://placehold.it/600x600",
                width: "600px", height: "600px"
            },
            chips: [
                {letter: "A", text: "Awesome Guy"},
                {letter: "C", text: "Computer Scientist"}
            ],
            slides: [
                {type: "DataTile", payload: "Born on the moon"},
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x400", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                }
            ]
        },
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 2,
            portrait: {
                url: "http://placehold.it/600x600",
                width: "600px", height: "600px"
            },
            chips: [
                {letter: "A", text: "Awesome Guy"},
                {letter: "C", text: "Computer Scientist"}
            ],
            slides: [
                {type: "DataTile", payload: "Born on the moon"},
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x400", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "http://placehold.it/300x200", height: "200px", width: "300px"}
                }
            ]
        }
    ];
});