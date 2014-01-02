var cheatSheet = angular.module('cheatSheet', ['ngRoute']);

// configure our routes
cheatSheet.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

});


// create the controller and inject Angular's $scope
cheatSheet.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});
