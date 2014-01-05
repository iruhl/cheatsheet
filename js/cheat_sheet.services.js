var cheatSheetServices = angular.module('cheatsheet.services', ['ngResource']);


cheatSheetServices.factory('TemplateService', function ($resource) {
    return $resource('/data/templates.json');
});

cheatSheetServices.factory('WidgetService', function ($resource) {
    return $resource('/data/widgets.json');
});

cheatSheetServices.factory('TabsService', function ($resource) {
    return $resource('/data/tabs.json');
});
