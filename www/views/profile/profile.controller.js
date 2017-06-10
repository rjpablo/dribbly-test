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
        vm.profilePic = [];
        vm.uploading = false;

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
                vm.profilePicUrlPrefix = settings.fileUploadBasePath + $scope.profile.details.userId + '/profilePic/'
                vm.profilePic.push({
                    fileName: $scope.profile.details.profilePic,
                    url: vm.profilePicUrlPrefix + $scope.profile.details.profilePic
                })
            } else {
                vm.profilePicUrlPrefix = settings.defaultProfilePicDirectory
                vm.profilePic.push({
                    fileName: settings.defaultProfilePicFileName,
                    url: settings.defaultProfilePicUrl
                })
            }
        }

        this.replaceProfilePhoto = function (file) {
            fileService.validateFile(file, function (result) {
                vm.showUploadDetails = true;
                vm.uploading = true;
                var currFile = file
                var fileName;
                currFile.progress = 0;

                fileService.uploadProfilePhoto(currFile, $scope.profile.details.userId).then(function (response) {
                    fileName = response.data;
                    vm.tempProfile = angular.copy($scope.profile.details);
                    vm.tempProfile.profilePic = fileName;
                    profileContext.updateProfile(vm.tempProfile).then(
                        function (res) {
                            vm.uploading = false
                            vm.profilePicUrlPrefix = settings.fileUploadBasePath + $scope.profile.details.userId + '/profilePic/'
                            vm.profilePic = [];
                            vm.profilePic.push({ url: settings.fileUploadBasePath + $scope.profile.details.userId + '/profilePic/' + fileName, fileName: fileName });
                            $scope.profile.details = angular.copy(vm.tempProfile)
                        }, function (err) {
                            vm.uploading = false
                            commonServices.handleError(err)
                        })
                }, function (response) {
                    vm.uploading = false
                    commonServices.toast.error('Upload failed for \'' + currFile.name + '\'');
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    currFile.progress = vm.progress;
                });
            }, function (errors) {
                commonServices.toast.error(errors.join('\n'));
            });
        }

    };

})();