angular.module('app.persons', [
]);
angular.module('app.persons').config(function ($stateProvider) {
    $stateProvider
        .state('app.persons', {
            url: 'persons',
            templateUrl: 'src/app/persons/persons.html',
            controller: 'PersonsCtrl'
        });
}).controller('PersonsCtrl', function ($scope, persons) {
    $scope.data = {};
    $( document ).ready(function(){
        $(".dropdown-button").dropdown();
    });
    persons.getAllPersons()
        .then(function (persons) {
            $log.log('persons', persons);
            $scope.data.persons = persons;
        }, function (error) {
            Materialize.toast("Fehler beim Laden der Personen", 4000);
        });
});