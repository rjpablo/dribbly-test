(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope', 'settings', 'httpService', 'commonServices', '$stateParams',
            'courtContext', 'NgMap', 'mapService', '$timeout', '$uibModal', 'authentication', courtDetailsCtrl]);

    function courtDetailsCtrl($scope, settings, httpService, commonServices, $stateParams,
        courtContext, NgMap, mapService, $timeout, $uibModal, authentication) {

        var vm = this;
        this.owned; //whether or not the viewer owns the court being viewed

        this.court = {}
        this.courtId = $stateParams.id;
        this.imageDir = settings.imageUploadPath;
        this.tempCourt = {}
        this.onEditMode = false;
        this.detailsUpdating = false;
        this.location = {}

        this.imageUploadPath = settings.imageUploadPath;
        this.courtImgSrcPrefix = settings.fileUploadBasePath;
        vm.loadingCourtOptions = false;

        var setCourtsSearched = function (courts) {
            return courts;
        }

        this.setPrimaryByFileName = function (fileName) {
            var done = false;
            for (var x = 0; (x < vm.court.photos.length && !done) ; x++) {
                if (vm.court.photos[x].fileName == fileName) {
                    vm.court.photos[x].isPrimary = (vm.court.imagePath == fileName ? true : false);
                    done = true;
                }
            }
        }

        courtContext.getCourtDetails(vm.courtId).then(
            function (result) {
                vm.court = result.data
                if (vm.court) {
                    commonServices.setPageTitle(vm.court.name + ' - Court Details')
                    vm.setPrimaryByFileName(vm.court.imagePath);
                    if ($scope.currentUser) {
                        vm.owned = ($scope.currentUser.UserId == vm.court.userId)
                    }
                    initializeMap()
                }
            }, function (error) {
                commonServices.handleError(error);
                vm.court = null;
            });

        vm.getUserToCourtRelation = function () {
            vm.loadingCourtOptions = true;
            courtContext.getUserToCourtRelation(vm.court.id, $scope.currentUser.UserId).then(
                function (result) {
                    vm.loadingCourtOptions = false;
                    vm.userToCourtRelation = result.data;
                }, function (err) {
                    vm.loadingCourtOptions = false;
                    commonServices.handleError(err);
                })
        }

        vm.followCourt = function () {
            courtContext.followCourt(vm.court.id, $scope.currentUser.UserId).then(
                function (result) {
                    vm.userToCourtRelation.isFollowing = true
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.SetGame = function () {
            authentication.checkAuthentication('Please log in to proceed.').then(function (res) {

                var addCourtModal = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    component: 'gameDetailsModal',
                    resolve: {
                        modalData: function(){
                            return {
                                isAdd: true,
                                game: {
                                    courtId: vm.court.id,
                                    court: vm.court
                                }
                            }
                        }
                    },
                    size: 'md'
                });

                addCourtModal.result.then(function (game) {
                    //$state.go('gameDetails.players', { gameId: game.id });
                    //commonServices.toast.success('New game created successfully.')
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })
        }

        vm.unfollowCourt = function () {
            courtContext.unfollowCourt(vm.court.id, $scope.currentUser.UserId).then(
                function (result) {
                    vm.userToCourtRelation.isFollowing = false
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.optionsDropdownToggled = function (open) {
            if (vm.dropDownIsOpen) {
                vm.getUserToCourtRelation();
            }
        }

        vm.edit = function () {
            vm.tempCourt = angular.copy(vm.court)
            vm.onEditMode = true;
        }

        vm.cancel = function () {
            vm.onEditMode = false;
        }

        vm.save = function () {
            vm.detailsUpdating = true;
            courtContext.updateCourt(vm.tempCourt).then(
                function (res) {
                    vm.onEditMode = false;
                    vm.detailsUpdating = false;
                    vm.court = vm.tempCourt;
                    vm.showOnMap();
                    commonServices.toast.success('Changes saved!')
                },
                function (err) {
                    vm.detailsUpdating = false;
                    commonServices.handleError(err);
                }
            )
        }

        vm.updateAddress = function (loc) {
            vm.tempCourt.address = loc.formatted_address;
            vm.tempCourt.latitude = mapService.getLatFromLocation(loc)
            vm.tempCourt.longitude = mapService.getLngFromLocation(loc)
        }

        this.setPrimary = function (index) {
            courtContext.updatePrimaryPhoto(vm.court.id, vm.court.photos[index].fileName).then(
                function (result) {
                    vm.court.imagePath = vm.court.photos[index].fileName
                    for (var x = 0; x < vm.court.photos.length; x++) {
                        vm.court.photos[x].isPrimary = false;
                    }
                    vm.court.photos[index].isPrimary = true;
                    commonServices.toast.info("Primary photo has been updated!");
                }, function (error) {
                    commonServices.handleError(error);
                });
        }

        this.removePhoto = function (index) {
            var fileName = vm.court.photos[index].fileName;
            var isPrimary = (vm.court.photos[index].isPrimary);

            if (!isPrimary) {
                commonServices.confirm('Delete photo?', function () {
                    courtContext.deletePhoto(fileName).then(
                        function () {
                            //commonServices.toast.info('Photo deleted')
                        }, function () {
                            commonServices.log.error('Failed to delete photo: ' + fileName);
                        }
                    );
                    vm.methods.delete(index);
                })
            } else {
                commonServices.alert('Cannot delete primary photo!');
            }
        }

        vm.showOnMap = function () {

            if (vm.mapMarker) { //delete marker if existing
                vm.mapMarker.setMap(null);
                vm.mapMarker = null;
            }

            if (vm.court.latitude && vm.court.longitude) {
                var latLng = {
                    lat: vm.court.latitude,
                    lng: vm.court.longitude
                }
                vm.mapMarker = mapService.addMarker((latLng), vm.map, true);
            }
        }

        function initializeMap() {
            NgMap.getMap({ id: 'courtLocationMap' }).then(function (map) {
                vm.map = map;
                vm.showOnMap();
            });
        }

    };

})();