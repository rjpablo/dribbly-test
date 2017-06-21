/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('drTimetable', ttDirective);

    function ttDirective() {
        return {
            //priority: 2,
            restrict: "E",
            scope: {
                'drTimetable': '=?',
                'drTimetableOptions': '=?'
            },
            templateUrl: '/js/directives/dr-timetable/dr-timetable.template.html',
            link: function (scope, element, attrs) {
                scope.startDate = new Date();

            }
        }
    }
})();