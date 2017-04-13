(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('findCourtCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'courtContext', 'authentication', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, courtContext, authentication) {

        var vm = this;

        $scope.setActiveTab(0);
	
		this.courtsSearched = {};

		this.imageUploadPath = settings.imageUploadPath;

        var setCourtsSearched = function(courts){
            return courts;
        }

        this.tempCourts = [
            {
                id: 1,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: '1.jpg'
            },
            {
                id: 2,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: '2.jpg'
            },
            {
                id: 3,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: '3.jpg'
            },
            {
                id: 4,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: '4.jpg'
            },
            {
                id: 5,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: '5.jpg'
            },
            {
                id: 6,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: '2.jpg'
            }
        ];//Sample Courts
		
        if (settings.useLocalData) {
            this.courtsSearched = this.tempCourts;
        } else {
            courtContext.getCourts().then(
            function (result) {
                vm.courtsSearched = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.courtsSearched = null;
            });
        }        

        //getCourts(setCourtsSearched);

        vm.animationsEnabled = true;

        vm.openAddModal = function (size, parentSelector) {
            
            authentication.checkAuthentication().then(function () {
                var parentElem = parentSelector ?
              angular.element($document[0].querySelector(parentSelector)) : undefined;
                var addCourtModal = $uibModal.open({
                    animation: vm.animationsEnabled,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/courts/courts/add-modal-template.html',
                    controller: 'addCourtCtrl',
                    controllerAs: 'addCourtCtrl',
                    resolve: {
                        currentUser: function () {
                            return $scope.currentUser
                        }
                    },
                    size: size,
                    appendTo: parentElem
                });

                addCourtModal.result.then(function (court) {
                    commonServices.toast.success('New court has been added successfully.')
                    vm.addCourt(court);
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })            
        };

        this.addCourt = function (court) {
            vm.courtsSearched.push(court);
        }

    };

})();