var cheatSheet = angular.module('cheatSheet', ['ngRoute', 'ngSanitize', 'ngResource']);


cheatSheet.factory('TemplateService', function ($resource) {
  return $resource('/data/templates.json');
});


cheatSheet.config(function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        }).when('/end2end', {
            templateUrl: 'views/E2ETesting.html',
            controller: 'e2etestingController'
        }).when('/widgets', {
            templateUrl: 'views/widgetlist.html',
            controller: 'widgetlistController'
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


cheatSheet.controller('widgetlistController', function ($scope, $http) {
    $scope.jumboTitle = 'List of widgets';
    $scope.jumboMessage = 'Test to se if we can list different widgets with different templates';
    
    $http.get('/data/widgets.json').success(function(data) {
    $scope.widgets = data;
  });
});

cheatSheet.controller('WidgetController', function ($scope , TemplateService ) {
    TemplateService.get(function(templates){
        $scope.template = templates[$scope.widget.type];
    });
});

