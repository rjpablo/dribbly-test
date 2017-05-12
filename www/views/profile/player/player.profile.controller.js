(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('playerProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', 'message', '$location', '$uibModalInstance', '$state', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        message, $location, $uibModalInstance, $state) {

        var vm = this;

    };

})();