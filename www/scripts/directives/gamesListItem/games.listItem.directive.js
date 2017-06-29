/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('gamesListItem', ['settings', courtListItemDirective]);

    function courtListItemDirective(settings) {
        return {
            //priority: 2,
            restrict: "E",
            scope: {
                'game': '=',
                'iconUrlPrefix': '='
            },
            replace: true,
            templateUrl: '/scripts/directives/gamesListItem/games.listItem.template.html',
            link: function (scope, element, attrs) {
                scope.$settings = settings
            }
        }
    }
})();