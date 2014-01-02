var cheatSheet = angular.module('cheatSheet', ['ngRoute']);

// configure our routes
cheatSheet.config(function ($routeProvider, $locationProvider ) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        }).when('/end2end', {
            templateUrl: 'views/E2ETesting.html',
            controller: 'e2etestingController'
        })

});


cheatSheet.controller('mainController', function ($scope) {
    $scope.jumboTitle = 'Writing Good Code!';
    $scope.jumboMessage = 'DRC:s checklists and quick reference sheet for producing redable, maintainable, extendable and testable code!';
});


cheatSheet.controller('e2etestingController', function ($scope) {
$scope.jumboTitle = 'End-2-End Testing';
    $scope.jumboMessage = 'DRC:s Cheat Sheet for setting up and writing End-2-End Tests with Protractor.';
});
