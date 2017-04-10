(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('loginCtrl', ['$scope', 'settings', 'httpService', 'commonServices', 'authentication', 'message', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication, message) {

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
                        console.log('Login successful!')
                    }, function (err) {
                        console.log('Login failed: ' + err.Message);
                    }
                )
            }
        }

    };

})();