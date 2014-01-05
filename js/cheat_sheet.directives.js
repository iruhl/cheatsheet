var cheatSheetDirectives = angular.module('cheatsheet.directives', ['ngRoute']);

cheatSheetDirectives.directive('bsNavItem', function ($route) {
    
    function trimLeadingHash( routeUrl ) {
        return routeUrl.replace(/^#/, "");
    }
    
    function link(scope, element, attrs) {
        scope.$on('$routeChangeSuccess', function( angularEvent , current, previous ) { 
            if( !current.$$route ) { 
                element.removeClass('active');
                return;
            }
            if( current.$$route.originalPath === trimLeadingHash( scope.url ) ) {
                element.addClass('active');
            } else {
                element.removeClass('active');
            }
        });
    }
    
    return {
        template: '<a href="{{url}}">{{text}}</a>',
        scope: {
            text: '@text',
            url:'@url',
        },
        link:link
    };
});
