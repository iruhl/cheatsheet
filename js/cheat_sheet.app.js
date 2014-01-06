var cheatSheet = angular.module('cheatsheet', ['ngRoute', 'ngSanitize', 'ngResource', 'cheatsheet.services', 'cheatsheet.filters', 'cheatsheet.directives']);


var tabs = [
    {
        route: "/widgets/:tagCollection",
        params: {
            templateUrl: 'views/widgetlist.html',
            controller: 'widgetlistController'
        }
    }
];

cheatSheet.config(function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    tabs.forEach(function (route, index, routes) {
        $routeProvider.when(route.route, route.params);
    });

    $routeProvider.otherwise({
        templateUrl: 'views/widgetlist.html',
        controller: 'widgetlistController'
    });

});

cheatSheet.controller('navController', function ($scope, $location, TabsService) {
    
    $scope.navTabs = [];
    setDefaultsToScope();
    
    TabsService.query(function (tabs) {
        $scope.navTabs = tabs;
    });

    $scope.$on('$locationChangeSuccess', function( angularEvent , newUrl , oldUrl  ) { 
        var currentNavtab = getCurrentNavTabFromRoutePath($location.path());
        
        // Guard aginst no current NavTab Item
        if(!currentNavtab){
            setDefaultsToScope();
            return;
        }
        
        $scope.tags = currentNavtab.tags;
        $scope.jumboTitle = currentNavtab.jumboTitle;
        $scope.jumboMessage = currentNavtab.jumboMessage;
    });

    function setDefaultsToScope() {
        $scope.tags = [];
        $scope.jumboTitle = 'Writing Good Code!';
        $scope.jumboMessage = 'DRC:s checklists and quick reference sheet for producing redable, maintainable, extendable and testable code!';
    }
    
    function trimLeadingHash(routeUrl) {
        return routeUrl.replace(/^#/, "");
    }

    function find(array, findElementCallback) {
        var callbackResult = false;
        for (var i = 0; i < array.length; i++) {
            if (findElementCallback(array[i], i, array)) {
                return array[i];
            }
        }
        return undefined;
    }

    function getCurrentNavTabFromRoutePath(path) {
        return find($scope.navTabs, function (element, index, array) {
            if (path === trimLeadingHash(element.url)) {
                return true;
            }
            return false;
        });;
    }

});

cheatSheet.controller('widgetlistController', function ($scope, WidgetService, widgetTagFilter) {
    WidgetService.query(function (widgets) {
        $scope.widgets = widgetTagFilter(widgets, $scope.tags);
    });
});

cheatSheet.controller('WidgetController', function ($scope, TemplateService) {
    TemplateService.get(function (templates) {
        $scope.template = templates[$scope.widget.type];
    });
});