/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('rating', courtListItemDirective);

    function courtListItemDirective() {
        return {
            restrict: 'AE',
            templateUrl: '/scripts/directives/rating/rating.directive.template.html',
            scope: {
                value: '=value'
            }
        }
    }
})();