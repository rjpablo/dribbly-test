(function () {
    'use strict';

    angular.module('mainApp')
        .controller('indexCtrl',['$scope', 'toastService', '$state', 'authentication', '$rootScope', 'settings', indexCtrl]);

    function indexCtrl($scope, toastService, $state, authentication, $rootScope, settings) {
        var vm = this;

        $scope.currentUser = authentication.getCurrentUser();
        this.activeNavIndex = -1;
        this.state = $state;
        this.toastSettings = toastService.settings;
        this.isNavCollapsed = true;
        $scope.$state = $state;
        $scope.$settings = settings;

        $scope.showLoginModal = function (message) {
            authentication.showLoginModal(message).then(function (res) {

            },function(err){
                
            });
        }

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        }

        $scope.logOut = function () {

            $scope.currentUser = null

            authentication.logout().then(function (result) {

            }, function (result) {
                console.log('User may have not been successfully logged out from the server.')
            })
        }

        vm.isFullwidth = function () {
            var stateName = $state.current.name
            if(stateName == 'login' ||
                stateName == 'registration') {
                return true;
            } else {
                return false;
            }
        }

        $rootScope.$on('AUTHORIZATION_SUCCESSFUL', function (evt, user) {
            $scope.setCurrentUser(user);
        });

        $rootScope.$on('LOGGED_OUT', function (evt, user) {
            $scope.setCurrentUser(null);
        });

        $rootScope.$broadcast('AUTHORIZATION_FAILED', function () {
            $scope.setCurrentUser(null);
        });

    }

})();