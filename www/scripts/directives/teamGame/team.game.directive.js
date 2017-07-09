/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('teamGame', ['settings', courtListItemDirective]);

    function courtListItemDirective(settings) {
        return {
            //priority: 2,
            restrict: "E",
            scope: {
                'game': '=',
                'iconUrlPrefix': '=',
                'type': '='
            },
            replace: true,
            templateUrl: '/scripts/directives/teamGame/team.game.template.html',
            link: function (scope, element, attrs) {
                scope.$settings = settings
            }
        }
    }
})();