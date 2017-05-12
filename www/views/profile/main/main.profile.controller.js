(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('mainProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$uibModalInstance', '$state', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $uibModalInstance, $state) {

        var vm = this;

    };

})();