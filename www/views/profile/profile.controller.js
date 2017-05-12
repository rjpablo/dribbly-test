(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('profileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', '$stateParams', 'profileContext', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, $stateParams, profileContext) {

        $scope.setActiveNavIndex(0);
        $scope.profile = {};

        var vm = this;
        vm.activeTabIndex = 0;

        getProfile();

        $scope.setActiveTab = function (index) {
            vm.activeTabIndex = index;
        }

        function getProfile() {
            profileContext.getProfileByName($stateParams.userName).then(
                function (res) {
                    $scope.profile = res.data;
                },
                function (err) {
                    commonServices.handleError(err);
                })
        }

    };

})();