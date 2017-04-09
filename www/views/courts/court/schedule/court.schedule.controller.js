(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtScheduleCtrl', ['settings', 'httpService', 'commonServices', '$stateParams', 'courtContext', courtDetailsCtrl]);

    function courtDetailsCtrl(settings, httpService, commonServices, $stateParams, courtContext) {

    }

})();