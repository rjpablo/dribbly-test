(function () {
    'user strict';

    angular.module('mainApp')
        .controller('indexCtrl',['$scope', 'toastService', '$state', 'authentication', indexCtrl]);

    function indexCtrl($scope, toastService, $state, authentication) {
        var vm = this;

        this.currentUser = null;
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
            vm.currentUser = user;
        }

    }

})();