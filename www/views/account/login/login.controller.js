(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('loginCtrl', ['$scope', 'settings', 'httpService', 'commonServices', 'authentication', 'message', '$location', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication, message, $location) {

        var vm = this;

        this.message = message;

        this.userData = {
            Username: '',
            Password: ''
        }

        this.Login = function (loginForm) {
            if (loginForm.$valid) {
                authentication.login(vm.userData).then(
                    function (result) {
                        $location.path('courts/')
                    }, function (err) {
                        commonServices.handleError(err);
                    }
                )
            }
        }

    };

})();