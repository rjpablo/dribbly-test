(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamDetailsController', ['$scope', 'settings', 'httpService', 'commonServices', 'fileService',
            'authentication', '$location', '$state', '$stateParams', 'teamContext', 'profileContext', '$timeout', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, fileService, authentication,
        $location, $state, $stateParams, teamContext, profileContext, $timeout) {

        $scope.team = {};
        $scope.$state = $state;

        var vm = this;
        var teamName = decodeURIComponent($stateParams.teamName)
        $scope.teamLogo = []; //array is required by the image gallery but this will contain only the logo
        vm.uploading = false;
        vm.onEditMode = false;
        vm.tempTeamDetails = {};
        this.teamLogoSrcPrefix = '';
        vm.user_autoComplete = [];
        vm.userSearchRemoteUrl = settings.apiBaseURL + 'UserProfiles/UserViews/';
        vm.managerInitialValue = "";
        vm.selectedManager = {};
        vm.loadingTeamOptions = false;
        vm.userToTeamRelation = {};

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

        vm.optionsDropdownToggled = function (isOpen) {
            if (isOpen) {                
                if ($scope.currentUser) {
                    vm.loadingTeamOptions = true;
                    teamContext.getUserToTeamRelation($scope.team.details.teamId, $scope.currentUser.UserId).then(
                        function (res) {
                            vm.loadingTeamOptions = false;
                            vm.userToTeamRelation = res.data;
                        }, function (err) {
                            vm.loadingTeamOptions = false;
                            commonServices.handleError(err);
                        }
                    )
                }else{
                    vm.userToTeamRelation = null;
                }
            }
        }

        vm.respondToInvitation = function (accept) {
            if($scope.currentUser){
                teamContext.respondToInvitation($scope.team.details.teamId, $scope.currentUser.UserId, accept).then(
                function () {
                    commonServices.toast.success('Invitation accepted!')
                    $scope.$broadcast('reload-team-members');
                }, function (err) {
                    commonServices.handleError(err);
                })
            } else {

            }            
        }

        vm.cancelRequest = function () {
            authentication.checkAuthentication("Please log in to proceed.").then(
                function (res) {
                    teamContext.cancelRequest($scope.currentUser.UserId, $scope.team.details.teamId).then(
                        function (res) {
                            commonServices.toast.success("Request Cancelled!");
                        }, function (err) {
                            commonServices.handleError(err)
                        })
                }, function (err) {
                    //login failed or was cancelled
                })
        }

        vm.managerSelected = function (value) {
            if (value) {
                setManager(value.originalObject);
            } else {
                setManager(null);
            }
        }

        vm.managerDeleted = function (user) {
            setManager(null);
        }

        function setManager(user) {
            if (user) {
                vm.tempTeamDetails.manager = user;
                vm.tempTeamDetails.managerId = user.userId;
            } else {
                vm.tempTeamDetails.manager = undefined;
                vm.tempTeamDetails.managerId = undefined;
            }
        }

        vm.edit = function () {
            vm.tempTeamDetails = angular.copy($scope.team.details)
            vm.tempTeamDetails.manager.title = vm.tempTeamDetails.manager.userName
            //vm.selectedManager = {
            //    title: vm.tempTeamDetails.manager.userName,
            //    originalObject: vm.tempTeamDetails.manager
            //}
            //vm.selectedManager.title = vm.tempTeamDetails.manager.userName;
            //vm.selectedManager.originalObject = vm.tempTeamDetails.manager;
            //vm.managerInitialValue = vm.tempTeamDetails.manager.userName;
            $scope.$broadcast('angucomplete-alt:changeInput', 'manager-autocomplete', vm.tempTeamDetails.manager);

            vm.onEditMode = true
        }

        vm.saveCheck = function (theForm) {
            if (vm.tempTeamDetails.manager && vm.tempTeamDetails.manager.userId) {
                vm.save(theForm);
            } else {
                commonServices.toast.error('Team manager is required.')
            }
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

        vm.join = function () {
            authentication.checkAuthentication("Please log in to join this team.").then(
                function (res) {
                    teamContext.join($scope.currentUser.UserId, $scope.team.details.teamId).then(
                        function (res) {
                            commonServices.toast.success("Request sent!");
                        }, function (err) {
                            commonServices.handleError(err)
                        })
                }, function (err) {
                    //login failed or was cancelled
                })
        }

        vm.leave = function () {
            authentication.checkAuthentication("Please log in to proceed.").then(
                function (res) {
                    teamContext.leave($scope.currentUser.UserId, $scope.team.details.teamId).then(
                        function (res) {
                            commonServices.toast.info("You are no longer a current member of this team.");
                        }, function (err) {
                            commonServices.handleError(err)
                        })
                }, function (err) {
                    //login failed or was cancelled
                })
        }

        vm.dismissPlayer = function () {
            authentication.checkAuthentication("Please log in to proceed.").then(
                function (res) {
                    teamContext.dismiss($scope.currentUser.UserId, $scope.team.details.teamId).then(
                        function (res) {
                            commonServices.toast.info("Player is no longer a current member of this team.");
                        }, function (err) {
                            commonServices.handleError(err)
                        })
                }, function (err) {
                    //login failed or was cancelled
                })
        }

        vm.getUserAutoCompleteItems = function (userName) {
            vm.user_autoComplete.length = 0;
            profileContext.searchUsersByName(userName).then(
                function (res) {
                    vm.user_autoComplete = res.data;
                }, function (err) {
                    commonServices.handleError(err);
                })
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