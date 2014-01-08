var cheatSheetServices = angular.module('cheatsheet.services', ['ngResource']);


cheatSheetServices.factory('TemplateService', function ($resource) {
    return $resource('/data/templates.json');
});

cheatSheetServices.factory('WidgetService', function ($resource) {
    return $resource('/data/widgets.json',null, {query: {method:'GET', cache:false, isArray:true }});
    
    //cache 
});

cheatSheetServices.factory('TabsService', function ($resource) {
    return $resource('/data/tabs.json',null, {query: {method:'GET', cache:false, isArray:true }});
});
