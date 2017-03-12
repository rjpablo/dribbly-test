(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope','$uibModal', '$document', courtCtrl])
        .controller('addCourtCtrl', ['$uibModalInstance', addCourtCtrl]);

    function courtCtrl($scope, $uibModal, $document) {

        var __this = this;

        this.courtsSearched = [
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

        this.animationsEnabled = true;

        this.openAddModal = function (size, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector(parentSelector)) : undefined;
            var addCourtModal = $uibModal.open({
                animation: this.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/www/views/court/add-modal-template.html',
                controller: 'addCourtCtrl',
                controllerAs: 'addCourtCtrl',
                size: size,
                appendTo: parentElem
                //resolve: {
                //    items: function () {
                //        return this.items;
                //    }
                //}
            });

            addCourtModal.result.then(function (court) {
                __this.addCourt(court);
            }, function (reason) {
                console.log('Reason for closing: ' + reason);
            });
        };

        this.addCourt = function (court) {
            this.courtsSearched.push(court);
        }

    };

    function addCourtCtrl($uibModalInstance) {

        this.court = { imagePath: 'images/sample images/courts/1.jpg' }


        this.ok = function () {
            $uibModalInstance.close(this.court);
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();