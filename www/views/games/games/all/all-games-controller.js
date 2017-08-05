(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('allGamesCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'gameContext', 'authentication', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, gameContext, authentication) {

        var vm = this;

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
        vm.loading = false;

        this.games = [];
        this.imageUploadPath = settings.imageUploadPath;
        this.gameImgSrcPrefix = settings.fileUploadBasePath;

        var setgames = function (courts) {
            return courts;
        }

        this.updateList = function () {
            gameContext.getCourts(vm.filtered ? vm.searchCriteria : undefined).then(
            function (result) {
                vm.games = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.games = null;
            });
        }

        if (settings.useLocalData) {
            vm.games = gameContext.getTestGames();
        } else {

            vm.loading = true;
            gameContext.getGames(null).then(
            function (result) {
                vm.games = result.data
                vm.loading = false
            }, function (error) {
                commonServices.handleError(error);
                vm.games = null;
                vm.loading = false
            });
        }

        vm.search = function (criteria) {
            courtContext.getCourts(criteria).then(
                function (res) {

                    vm.games = res.data;

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
            vm.games.push(court);
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