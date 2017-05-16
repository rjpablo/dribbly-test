(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('mainProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', 'profileContext', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, profileContext) {

        var vm = this;
    };

})();