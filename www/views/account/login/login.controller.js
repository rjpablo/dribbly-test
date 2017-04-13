(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('loginCtrl', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', 'message', '$location', '$uibModalInstance', '$state', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication,
        message, $location, $uibModalInstance, $state) {

        var vm = this;

        this.message = message;
        this.validating = false;

        this.userData = {
            Username: '',
            Password: ''
        }

        this.Login = function (loginForm) {
            if (loginForm.$valid) {
                vm.validating = true;
                authentication.login(vm.userData).then(
                    function (result) {
                        $location.path('courts/')
                        vm.validating = false;
                        $uibModalInstance.close()
                    }, function (err) {
                        vm.validating = false;
                        commonServices.handleError(err);
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