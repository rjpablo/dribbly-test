(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamsCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'teamContext', 'authentication', '$state', teamsCtrl]);

    function teamsCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, teamContext, authentication, $state) {

        commonServices.setPageTitle('Browse Teams')

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

        this.teams = [];
        this.imageUploadPath = settings.imageUploadPath;
        this.courtImgSrcPrefix = settings.fileUploadBasePath;

        var setteams = function (courts) {
            return courts;
        }

        this.updateList = function () {
            teamContext.getCourts(vm.filtered?vm.searchCriteria:undefined).then(
            function (result) {
                vm.teams = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.teams = null;
            });
        }

        if (settings.useLocalData) {
            this.teams = teamContext.getTestCourts();
        } else {
            vm.loading = true;
            teamContext.getTeams(null).then(
            function (result) {
                vm.teams = result.data
                vm.loading = false
            }, function (error) {
                commonServices.handleError(error);
                vm.teams = null;
                vm.loading = false
            });
        }

        vm.search = function (criteria) {
            teamContext.getCourts(criteria).then(
                function (res) {

                    vm.teams = res.data;

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
                    templateUrl: '/views/teams/add-team-modal/add-team-modal-template.html',
                    controller: 'addTeamCtrl',
                    controllerAs: 'addTeamCtrl',
                    resolve: {
                        currentUser: function () {
                            return $scope.currentUser
                        }
                    },
                    size: size,
                    appendTo: parentElem
                });

                addCourtModal.result.then(function (team) {
                    commonServices.toast.success('New court has been added successfully.')
                    $state.go('team.members', { teamName: team.teamName })
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })
        };

        this.addCourt = function (court) {
            vm.teams.push(court);
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