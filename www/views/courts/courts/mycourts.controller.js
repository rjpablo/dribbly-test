(function () {
    'use strict';

    angular.module('mainApp')
    .controller('myCourtsCtrl', myCourtCtrl);

    function myCourtCtrl() {
        var __this = this;

        __this.myCourts = [];

        __this.myCourts = getMyCourts();

        var getMyCourts = function () {
            return [];
        }
        
    }

})();