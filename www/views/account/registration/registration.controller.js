(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('registrationCtrl', ['$scope', 'settings', 'httpService', 'commonServices', 'authentication', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication) {

        var vm = this;

        this.userData = {
            Email: '',
            Username: '',
            Password: '',
            ConfirmPassword: ''
        }

        this.Register = function (regForm) {
            if (regForm.$valid) {
                authentication.register(vm.userData).then(
                    function (result) {
                        vm.userData = null;
                        authentication.showLoginModal('Your registration was successful! You may now login.');
                    }, function (err) {
                        commonServices.handleError(err);
                    }
                )
            }
        }

    };

})();