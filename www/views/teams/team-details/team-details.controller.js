(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamDetailsController', ['$scope', 'settings', 'httpService', 'commonServices', 'fileService',
            'authentication', '$location', '$state', '$stateParams', 'teamContext', '$timeout', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, fileService, authentication,
        $location, $state, $stateParams, teamContext, $timeout) {

        $scope.team = {};
        $scope.$state = $state;

        var vm = this;
        var teamName = decodeURIComponent($stateParams.teamName)
        $scope.teamLogo = []; //array is required by the image gallery but this will contain only the logo
        vm.uploading = false;
        vm.onEditMode = false;
        vm.tempTeamDetails = {};
        this.teamLogoSrcPrefix = '';

        getTeamDetails();

        function getTeamDetails() {
            if (settings.useLocalData) {
                $scope.team.details = teamContext.getTestProfiles()[0]
            } else {
                teamContext.getTeamDetails(teamName).then(
                function (res) {
                    $scope.team.details = res.data;
                    if ($scope.currentUser) {
                        $scope.isOwned = $scope.team.details.creatorId == $scope.currentUser.UserId
                    }
                    if ($scope.team.details.logoUrl) {
                        vm.teamLogoSrcPrefix = settings.fileUploadBasePath;
                        $scope.teamLogo.push({
                            fileName: $scope.team.details.logoUrl,
                            url: vm.teamLogoSrcPrefix + $scope.team.details.logoUrl
                        });
                    } else {
                        vm.teamLogoSrcPrefix = settings.defaultImagesDirectory;
                        $scope.teamLogo.push({
                            fileName: settings.defaultTeamLogoFileName,
                            url: settings.defaultTeamLogoUrl
                        });
                    }
                    //setProfPicUrlPrefix()
                },
                function (err) {
                    commonServices.handleError(err);
                })
            }            
        }



        vm.edit = function () {
            vm.tempTeamDetails = angular.copy($scope.team.details)
            vm.onEditMode = true
        }

        vm.save = function (theForm) {
            vm.saving = true
            teamContext.updateTeam(vm.tempTeamDetails).then(
                function (res) {
                    $scope.team.details = angular.copy(vm.tempTeamDetails)
                    commonServices.toast.success("Changes saved!")
                    vm.saving = false
                    vm.onEditMode = false
                }, function (err) {
                    commonServices.handleError(err)
                    vm.saving = false
                })
        }

        vm.cancel = function () {
            vm.onEditMode = false
        }

        vm.setHomeTown = function (location) {
            vm.tempTeamDetails.city = location.city;
        }

        function setProfPicUrlPrefix() {
            if ($scope.team.details.teamLogo) {
                vm.teamLogoUrlPrefix = settings.fileUploadBasePath + $scope.team.details.userId + '/photos/'
                $scope.teamLogo.push({
                    fileName: $scope.team.details.teamLogo.fileName,
                    url: vm.teamLogoUrlPrefix + $scope.team.details.teamLogo.fileName
                })
            } else {
                vm.teamLogoUrlPrefix = settings.defaultProfilePicDirectory
                $scope.teamLogo.push({
                    fileName: settings.defaultProfilePicFileName,
                    url: settings.defaultProfilePicUrl
                })
            }
        }

        $scope.updateProfilePicArray = function(fileName){
            $scope.teamLogo = [];
            $scope.teamLogo.push({ url: vm.teamLogoUrlPrefix + fileName, fileName: fileName });
        }

        this.replaceProfilePhoto = function (file) {
            fileService.validateFile(file, function (result) {
                vm.showUploadDetails = true;
                vm.uploading = true;
                var currFile = file
                var fileName;
                currFile.progress = 0;

                teamContext.uploadPhoto(currFile, $scope.team.details.userId, true).then(function (response) {
                    vm.uploading = false
                    vm.tempTeamDetails = angular.copy($scope.team.details);
                    vm.tempTeamDetails.teamLogo = response.data;
                    fileName = response.data.fileName;                    
                    //vm.teamLogoUrlPrefix = settings.fileUploadBasePath + $scope.team.details.userId + '/photos/'
                    $scope.updateProfilePicArray(fileName)
                    $scope.team.details = angular.copy(vm.tempTeamDetails)
                    $scope.$broadcast('primary-photo-uploaded', vm.tempTeamDetails.teamLogo)

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