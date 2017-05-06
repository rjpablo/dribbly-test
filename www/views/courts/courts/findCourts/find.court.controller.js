(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('findCourtCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'courtContext', 'authentication', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, courtContext, authentication) {

        var vm = this;

        $scope.setActiveTab(0);

        vm.searchCriteria = {
            rangeMin: 0,
            rangeMax: 1000,
            courtName: '',
            city: '',
            address: ''
        };

        vm.sortField = 'rate'
        vm.sortReverse = true;
        vm.sortIndex = 0;
        vm.sortObjects = [
            {
                description: 'Nearest First',
                field: 'name',
                reversed: false
            },
            {
                description: 'Cheapest First',
                field: 'rate',
                reversed: false
            },
            {
                description: 'Most Expensive First',
                field: 'rate',
                reversed: true
            }
        ]
        vm.sortObject = vm.sortObjects[0]
        vm.searchCriteriaStr = '';

        this.courtsSearched = {};

        this.imageUploadPath = settings.imageUploadPath;

        var setCourtsSearched = function (courts) {
            return courts;
        }

        if (settings.useLocalData) {
            this.courtsSearched = courtContext.getTestCourts();
        } else {
            courtContext.getCourts().then(
            function (result) {
                vm.courtsSearched = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.courtsSearched = null;
            });
        }

        vm.search = function (criteria) {
            courtContext.searchCourts(criteria)

            var temp = '';

            if (criteria.courtName != '') {
                temp = temp + 'Name contains "' + criteria.courtName + '", '
            }

            if (criteria.address != '') {
                temp = temp + 'Address contains "' + criteria.address + '", '
            }

            temp = temp + 'Rate: ₱' + criteria.rangeMin + ' - ₱' + criteria.rangeMax;

            vm.searchCriteriaStr = temp;

        }

        vm.animationsEnabled = true;

        vm.openAddModal = function (size, parentSelector) {

            authentication.checkAuthentication('Please log in to proceed.').then(function (res) {

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
                    vm.addCourt(court.data);
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })
        };

        this.addCourt = function (court) {
            vm.courtsSearched.push(court);
        }

        vm.sort = function () {
            switch (vm.sortIndex) {
                case '1':
                    vm.sortField = 'rate'
                    vm.sortReverse = false;
                    break;
                case '2':
                    vm.sortField = 'rate'
                    vm.sortReverse = true;
                    break;
                default:
                    vm.sortField = 'name'
                    vm.sortReverse = false;
                    break;
            }
        }

    };

})();