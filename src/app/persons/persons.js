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
    $(document).ready(function () {
        $(".dropdown-button").dropdown();
    });
    persons.getAllPersons()
        .then(function (persons) {
            $log.log('persons', persons);
            $scope.data.persons = persons;
        }, function (error) {
            Materialize.toast("Fehler beim Laden der Personen", 4000);
        });
    $scope.changePerson = function (id) {
        angular.forEach($scope.data.persons, function (person) {
            if (person.id === id) {
                angular.copy(person, $scope.data.selectedPerson);
            }
        });
    };
    //test data
    $scope.data.persons = [
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 3,
            portrait: {
                url: "url(https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg)",
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
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x400)", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                }
            ]
        },
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 1,
            portrait: {
                url: "url(http://placehold.it/600x600)",
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
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x400)", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                }
            ]
        },
        {
            vorname: "Alan", nachname: "Turing", caption: "First human on the moon", id: 2,
            portrait: {
                url: "url(http://placehold.it/600x600)",
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
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x400)", height: "400px", width: "300px"}
                },
                {
                    type: "ImageTile",
                    caption: "Bomba",
                    src: {url: "url(http://placehold.it/300x200)", height: "200px", width: "300px"}
                }
            ]
        }
    ];
});