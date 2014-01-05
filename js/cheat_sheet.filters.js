var cheatSheetFilters = angular.module('cheatsheet.filters', []);

cheatSheetFilters.filter('widgetTag', function () {

    function isString(variable) {
        return typeof variable === 'string';
    } 

    function isArray(variable) {
        return Object.prototype.toString.call(variable) === '[object Array]';
    }
    
    function isEmptyArray(variable) {
        return variable.length <= 0;
    }

    function taglistHasTag(taglist, tag) {
        return taglist.indexOf(tag) !== -1
    }

    function widgethasTags(widget, tags) {

        for (var i = 0; i < tags.length; i++) {
            if (taglistHasTag(widget.tags, tags[i])) {
                return true;
            }
        }

        // No specified tag was found on widget
        return false;
    }

    return function (input, tags) {
        // Guard aginst no tags
        if (!tags) {
            return input;
        }
        // Guard aginst single string tag
        if (isString(tags)) {
            tags = [tags];
        }
        // Guard agints tags is not an array and empty array
        if (!isArray(tags) || isEmptyArray( tags )) {
            return input;
        }

        return input.filter(function (widget, index) {
            return widgethasTags(widget, tags);
        });
    }
});