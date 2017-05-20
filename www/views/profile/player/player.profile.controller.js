(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('playerProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state) {

        var vm = this;

    };

})();