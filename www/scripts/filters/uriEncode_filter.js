(function () {
    'use strict';

    angular.module('mainApp')
    .filter('uriEncode', function () {
        return function (input) {
            if (input) {
                return window.encodeURIComponent(input);
            }
            return "";
        }
    });

})();