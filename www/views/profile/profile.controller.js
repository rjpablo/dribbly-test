(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('profileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', '$stateParams', 'profileContext', '$timeout', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, $stateParams, profileContext, $timeout) {

        $scope.profile = {};
        $scope.$state = $state;

        var vm = this;
        var userName = $stateParams.userName || $scope.currentUser.Username;
        vm.activeTabIndex = 0;

        if ($scope.currentUser) {
            $scope.isOwned = userName == $scope.currentUser.Username;
        }
        

        getProfile();

        $scope.setActiveTab = function (index) {
            vm.activeTabIndex = index;
        }

        function getProfile() {
            if (settings.useLocalData) {
                $scope.profile.details = profileContext.getTestProfiles()[0]
            } else {
                profileContext.getProfileByName(userName).then(
                function (res) {
                    $scope.profile.details = res.data;
                    $scope.profile.details.userName = userName;
                    setProfPicUrlPrefix()
                },
                function (err) {
                    commonServices.handleError(err);
                })
            }            
        }

        function setProfPicUrlPrefix() {
            if ($scope.profile.details.profilePic) {
                $scope.profilePicUrlPrefix = settings.fileUploadBasePath + $scope.profile.details.userId + '/profilePic/'
            } else {
                $scope.profilePicUrlPrefix = settings.defaultProfilePicDirectory
            }
        }

    };

})();