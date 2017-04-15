(function () {
    'user strict';

    angular.module('mainApp')
        .controller('indexCtrl',['$scope', 'toastService', '$state', 'authentication', '$rootScope', indexCtrl]);

    function indexCtrl($scope, toastService, $state, authentication, $rootScope) {
        var vm = this;

        $scope.currentUser = authentication.getCurrentUser();
        this.activeNavIndex = -1;
        this.state = $state;
        this.toastSettings = toastService.settings;
        this.isNavCollapsed = true;

        $scope.showLoginModal = function (message) {
            authentication.showLoginModal(message).then(function (res) {

            },function(err){
                
            });
        }

        $scope.setActiveNavIndex = function (index) {
            vm.activeNavIndex = index;
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

        $rootScope.$on('AUTHORIZATION_SUCCESSFUL', function (evt, user) {
            console.log('(indexCtrl) Received user: ' + user)
            $scope.setCurrentUser(user);
        });

        $rootScope.$broadcast('AUTHORIZATION_FAILED', function () {
            $scope.setCurrentUser(null);
        });

    }

})();