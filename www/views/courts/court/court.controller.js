﻿(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope', 'settings', 'httpService', 'commonServices', '$stateParams', 'courtContext', courtDetailsCtrl]);

    function courtDetailsCtrl($scope, settings, httpService, commonServices, $stateParams, courtContext) {

        $scope.setActiveNavIndex(-1);

        var vm = this;
        this.owned; //whether or not the viewer owns the court being viewed
	    
		this.court = {}
		this.courtId = $stateParams.id;
		this.imageDir = settings.imageUploadPath;
		this.activeTabIndex = 0;
		this.tempCourt = {}
		this.onEditMode = false;
		this.detailsUpdating = false;
		this.location = {}

		this.imageUploadPath = settings.imageUploadPath;
		this.courtImgSrcPrefix = settings.fileUploadBasePath;

		$scope.setActiveTab = function (index) {
		    vm.activeTabIndex = index;
		}

        var setCourtsSearched = function(courts){
            return courts;
        }

        var tempCourt = {
            userId: 'test-user',
            name: 'MGM Basketball Court',
            address: '#123 Paraiso St., Makati City, Manila',
            rate: '200',
            contactNo: '+63 932 987 7865',
            imagePath: '1.jpg',
            email: 'mgmbasketballcourt.gmail.com',
            photos: [
                {
                    id: 1,
                    fileName: '1.jpg'
                },
                {
                    id: 2,
                    fileName: '2.jpg'
                },
                {
                    id: 3,
                    fileName: '3.jpg'
                },
                {
                    id: 4,
                    fileName: '4.jpg'
                }
            ]
        }//dummy court

        this.setPrimaryByFileName = function (fileName) {
            var done = false;
            for (var x = 0; (x < vm.court.photos.length && !done) ; x++) {
                if (vm.court.photos[x].fileName == fileName) {
                    vm.court.photos[x].isPrimary = (vm.court.imagePath == fileName ? true : false);
                    done = true;
                }
            }
        }

        if (settings.useLocalData) {
            vm.court = tempCourt;
            vm.setPrimaryByFileName(vm.court.imagePath);
        } else {
            courtContext.getCourtDetails(vm.courtId).then(
            function (result) {
                vm.court = result.data
                if (vm.court) {
                    vm.setPrimaryByFileName(vm.court.imagePath);
                    if ($scope.currentUser) {
                        vm.owned = ($scope.currentUser.UserId == vm.court.userId)
                    }
                }
            }, function (error) {
                commonServices.handleError(error);
                vm.court = null;
            });
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
                if (commonServices.confirm('Delete photo?')) {
                    courtContext.deletePhoto(fileName).then(
                        function () {
                            //commonServices.toast.info('Photo deleted')
                        }, function () {
                            commonServices.log.error('Failed to delete photo: ' + fileName);
                        }
                    );
                    vm.methods.delete(index);
                }
            } else {
                commonServices.alert('Cannot delete primary photo!');
            }
        }



    };

})();