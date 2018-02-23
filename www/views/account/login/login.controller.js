(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('loginCtrl', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', registerFn]);

    function registerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state) {

        commonServices.setPageTitle('Login')

        var vm = this;

        vm.message = "";
        vm.validating = false;
        vm.loginFailed = false;

        vm.userData = {
            Username: '',
            Password: ''
        }

        checkURL();

        function checkURL() {
            var fragment = getFragment()
            if (fragment) {
                authCompletedCB(fragment)
            }
        }

        function getFragment() {
            var queryString = window.location.href.substr(window.location.href.indexOf("?") + 1)
            if (window.location.href.indexOf("?") != -1) {
                return commonServices.parseQueryString(queryString);
            } else {
                return null;
            }
        };

        function authCompletedCB(fragment) {

            if (fragment.haslocalaccount == 'False') {

                authentication.clearAuthData();

                authentication.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name.split(" ")[0],
                    externalAccessToken: fragment.external_access_token
                };

                authentication.registerExternal(authentication.externalAuthData).then(function (res) {
                    $location.path('/courts');
                }, function (err) {
                    commonServices.handleError(err);
                })

            }
            else {
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authentication.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/courts');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }
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

        this.register = function () {
            $state.go('registration')
        }

    };

})();