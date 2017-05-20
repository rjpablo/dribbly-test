(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('playersController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', '$stateParams', 'playersContext', '$timeout', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, $stateParams, playersContext, $timeout) {

    };

})();