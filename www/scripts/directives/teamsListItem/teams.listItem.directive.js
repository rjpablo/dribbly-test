/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('teamsListItem', ['settings', courtListItemDirective]);

    function courtListItemDirective(settings) {
        return {
            //priority: 2,
            restrict: "E",
            scope: {
                'team': '=',
            },
            replace: true,
            templateUrl: '/scripts/directives/teamsListItem/teams.listItem.template.html',
            link: function (scope, element, attrs) {
                scope.$settings = settings
            }
        }
    }
})();