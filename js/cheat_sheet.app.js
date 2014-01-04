var cheatSheet = angular.module('cheatSheet', ['ngRoute', 'ngSanitize', 'ngResource']);


cheatSheet.factory('TemplateService', function ($resource) {
  return $resource('/data/templates.json');
});

cheatSheet.factory('WidgetService', function ($resource) {
  return $resource('/data/widgets.json');
});

cheatSheet.filter('widgetTag', function() {
    
    function isString( variable ) {
        return typeof variable === 'string'; 
    } 
    
    function isArray( variable ) {
        return Object.prototype.toString.call( variable ) === '[object Array]'; 
    }
    
    function taglistHasTag(taglist, tag ) {
        return taglist.indexOf(tag) !== -1
    }
    
    function widgethasTags( widget, tags  ) {
        
        for( var i = 0; i < tags.length; i++) {
            if( taglistHasTag( widget.tags, tags[i] )) {return true; }
        }
        
        // No specified tag was found on widget
        return false;    
    }
    
    return function(input, tags) {
        // Guard aginst no tags
        if( !tags  ) { return input; }
        // Guard aginst single string tag
        if(isString( tags )) { tags = [tags]; }
        // Guard agints tags is not an array
        if( !isArray(tags) ) { return input;  }
        
      return input.filter(function(widget, index){
          return widgethasTags(widget, tags);
      });
    }
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
        });
});


cheatSheet.controller('mainController', function ($scope) {
    $scope.jumboTitle = 'Writing Good Code!';
    $scope.jumboMessage = 'DRC:s checklists and quick reference sheet for producing redable, maintainable, extendable and testable code!';
});


cheatSheet.controller('e2etestingController', function ($scope) {
$scope.jumboTitle = 'End-2-End Testing';
    $scope.jumboMessage = 'DRC:s Cheat Sheet for setting up and writing End-2-End Tests with Protractor.';
});


cheatSheet.controller('widgetlistController', function ($scope, WidgetService, widgetTagFilter ) {
    $scope.jumboTitle = 'List of widgets';
    $scope.jumboMessage = 'Test to se if we can list different widgets with different templates';
    
    WidgetService.query(function(widgets){
        $scope.widgets = widgetTagFilter(widgets, ['e2e'] );
    });
});

cheatSheet.controller('WidgetController', function ($scope , TemplateService ) {
    TemplateService.get(function(templates){
        $scope.template = templates[$scope.widget.type];
    });
});

