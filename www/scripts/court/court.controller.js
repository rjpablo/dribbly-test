(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope','$uibModal', '$document', '$http', 'settings', 'genericService', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, $http, settings, genericService) {

		var vm = this;
	
        this.courtsSearched = {};

        var setCourtsSearched = function(courts){
            return courts;
        }

        var getCourts = genericService.get('Court/GetCourts');

        this.tempCourts = [
            {
                id: 1,
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/1.jpg'
            },
            {
                id: 2,
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/2.jpg'
            },
            {
                id: 3,
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/3.jpg'
            },
            {
                id: 4,
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/4.jpg'
            },
            {
                id: 5,
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/5.jpg'
            },
            {
                id: 6,
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/2.jpg'
            }
        ];//Sample Courts
		
        if (settings.onTestingMode) {
            this.courtsSearched = this.tempCourts;
        } else {
            getCourts.then(
            function (result) {
                vm.courtsSearched = result.data
            }, function (result) {
                vm.courtsSearched = null;
            });
        }        

        //getCourts(setCourtsSearched);

        vm.animationsEnabled = true;

        vm.openAddModal = function (size, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector(parentSelector)) : undefined;
            var addCourtModal = $uibModal.open({
                animation: vm.animationsEnabled,
                backdrop:'static',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/www/views/court/add-modal-template.html',
                controller: 'addCourtCtrl',
                controllerAs: 'addCourtCtrl',
                size: size,
                appendTo: parentElem
            });

            addCourtModal.result.then(function (court) {
                vm.addCourt(court);
            }, function (reason) {
                
            });
        };

        this.addCourt = function (court) {
            vm.courtsSearched.push(court);
        }

    };

})();