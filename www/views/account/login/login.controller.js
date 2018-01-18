(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('loginCtrl', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', 'message', '$location', '$uibModalInstance', '$state', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication,
        message, $location, $uibModalInstance, $state) {

        var vm = this;

        vm.message = message;
        vm.validating = false;
        vm.loginFailed = false;

        vm.userData = {
            Username: '',
            Password: ''
        }

        this.Login = function (loginForm) {
            if (loginForm.$valid) {
                vm.validating = true;
                vm.loginFailed = false;
                authentication.login(vm.userData).then(
                    function (result) {
                        $location.path('courts/')
                        vm.validating = false;
                        $uibModalInstance.close()
                    }, function (err) {
                        vm.validating = false;
                        vm.loginFailed = true;
                    }
                )
            }
        }

        this.closeModal = function () {
            $uibModalInstance.dismiss()
        }

        this.register = function () {
            $state.go('registration')
            vm.closeModal();
        }

    };

})();