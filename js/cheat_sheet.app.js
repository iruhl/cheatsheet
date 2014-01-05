var cheatSheet = angular.module('cheatsheet', ['ngRoute', 'ngSanitize', 'ngResource', 'cheatsheet.services', 'cheatsheet.filters', 'cheatsheet.directives']);


var tabs = [
    {
        route: "/end2end",
        params: {
            templateUrl: 'views/E2ETesting.html',
            controller: 'e2etestingController'
        }
    },
    {
        route: "/widgets",
        params: {
            templateUrl: 'views/widgetlist.html',
            controller: 'widgetlistController'
        }
    },
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

cheatSheet.controller('navController', function ($scope, TabsService) {
    // Defaults
    $scope.tags = [];
    $scope.navTabs = [];
    $scope.jumboTitle = 'Writing Good Code!';
    $scope.jumboMessage = 'DRC:s checklists and quick reference sheet for producing redable, maintainable, extendable and testable code!';

    TabsService.query(function (tabs) {
        $scope.navTabs = tabs;
    });

    $scope.$on('$routeChangeSuccess', function (angularEvent, current, previous) {
        if (!current.$$route) {
            $scope.tags = [];
            return;
        }
        console.log("navController: " + current.$$route.originalPath);


        $scope.tags = getTagsFromRoute(current.$$route.originalPath);
    });

    function navTabsisEmpty() {
        return $scope.navTabs.length <= 0;
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

    function getTagsFromRoute(path) {
        // Guard aginst no navTabs
        if (navTabsisEmpty()) {
            return [];
        }

        var currentNavTab = find($scope.navTabs, function (element, index, array) {
            if (path === trimLeadingHash(element.url)) {
                return true;
            }
            return false;
        });

        if (!currentNavTab) {
            return [];
        }

        console.log(currentNavTab);
        return currentNavTab.tags;
    }

});


cheatSheet.controller('mainController', function ($scope) {});


cheatSheet.controller('e2etestingController', function ($scope) {
    $scope.jumboTitle = 'End-2-End Testing';
    $scope.jumboMessage = 'DRC:s Cheat Sheet for setting up and writing End-2-End Tests with Protractor.';
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