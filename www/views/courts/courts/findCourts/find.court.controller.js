(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('findCourtCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'courtContext', 'authentication', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, courtContext, authentication) {

        var vm = this;

        $scope.setActiveTab(0);

        vm.searchCriteria = {
            courtName: '',
            address: '',
            city: '',
        }

        vm.sortField = 'rate'
        vm.sortReverse = true;
        vm.sortIndex = 0;
        vm.sortObjects = [
            {
                description: 'Court Name (Ascending)',
                field: 'name',
                reversed: false
            },
            {
                description: 'Court Name (Descending)',
                field: 'name',
                reversed: true
            },
            {
                description: 'Rate (Ascending)',
                field: 'rate',
                reversed: false
            },
            {
                description: 'Rate (Descending)',
                field: 'rate',
                reversed: true
            }
        ]//Sort Objects
        vm.sortObject = vm.sortObjects[0]
        vm.searchCriteriaStr = '';
        vm.filtered = false; //whether or not the list is filtered

        this.courtsSearched = {};

        this.imageUploadPath = settings.imageUploadPath;

        var setCourtsSearched = function (courts) {
            return courts;
        }

        this.updateList = function () {
            courtContext.getCourts(vm.filtered?vm.searchCriteria:undefined).then(
            function (result) {
                vm.courtsSearched = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.courtsSearched = null;
            });
        }

        if (settings.useLocalData) {
            this.courtsSearched = courtContext.getTestCourts();
        } else {
            courtContext.getCourts(null).then(
            function (result) {
                vm.courtsSearched = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.courtsSearched = null;
            });
        }

        vm.search = function (criteria) {
            courtContext.getCourts(criteria).then(
                function (res) {

                    vm.courtsSearched = res.data;

                    var temp = '(';

                    if (criteria.courtName) {
                        temp = temp + 'Name contains "' + criteria.courtName + '", '
                    }

                    if (criteria.address) {
                        temp = temp + 'Address contains "' + criteria.address + '", '
                    }

                    temp = temp + 'Rate: ₱' + criteria.rangeMin + ' - ₱' + criteria.rangeMax + ')';

                    vm.searchCriteriaStr = temp;

                    vm.filtered = true;

                }, function (err) {
                    commonServices.handleError(err)
                }
            )

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
                    vm.updateList();
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })
        };

        this.addCourt = function (court) {
            vm.courtsSearched.push(court);
        }

        this.resetFilters = function () {
            vm.searchCriteria = {
                courtName: '',
                address: '',
                city: '',
            }

            vm.searchCriteriaStr = ''
            vm.filtered = false;

            vm.updateList();

        }

    };

})();