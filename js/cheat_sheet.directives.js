var cheatSheetDirectives = angular.module('cheatsheet.directives', []);

cheatSheetDirectives.directive('bsNavItem', function ($location) {
    
    function trimLeadingHash( routeUrl ) {
        return routeUrl.replace(/^#/, "");
    }
    
    function pathisOwnUrl( url ){
        return $location.path() === trimLeadingHash( url );
    } 
    
    function link( $scope, element, attrs) {
        $scope.$on('$locationChangeSuccess', function( angularEvent , newUrl , oldUrl  ) { 
            if( pathisOwnUrl( $scope.url )) {
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
