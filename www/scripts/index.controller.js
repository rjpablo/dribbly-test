(function () {
    'user strict';

    angular.module('mainApp')
        .controller('indexCtrl',['$scope', 'toastService', '$state', indexCtrl]);

    function indexCtrl($scope, toastService, $state) {
        var vm = this;

        vm.activeNavIndex = -1;
        this.state = $state;
        this.toastSettings = toastService.settings;
        this.isNavCollapsed = true;

        $scope.setActiveNavIndex = function (index) {
            vm.activeNavIndex = index;
        }

    }

})();