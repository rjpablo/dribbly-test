(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('allPlayersCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'playersContext', 'authentication', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, playersContext, authentication) {

        var vm = this;

        vm.searchCriteria = {
            playerName: '',
            address: '',
            city: '',
            mvpsMin: null,
            mvpsMax: null,
            rating :[],
            winRateMin: 1,
            winRateMax: 100
        }

        vm.sortReverse = true;
        vm.sortIndex = 0;
        vm.sortObjects = [
            {
                description: 'Date Joined (Ascending)',
                field: 'dateJoined',
                reversed: false
            },
            {
                description: 'Date Joined (Descending)',
                field: 'dateJoined',
                reversed: true
            },
            {
                description: 'Player Name (Ascending)',
                field: 'userName',
                reversed: false
            },
            {
                description: 'Player Name (Descending)',
                field: 'userName',
                reversed: true
            },
            {
                description: 'MVPs (Ascending)',
                field: 'mvps',
                reversed: false
            },
            {
                description: 'MPVs (Descending)',
                field: 'mvps',
                reversed: true
            },
            {
                description: 'Win Rate (Ascending)',
                field: 'winRate',
                reversed: false
            },
            {
                description: 'Win Rate (Descending)',
                field: 'winRate',
                reversed: true
            }
        ]//Sort Objects
        vm.sortObject = vm.sortObjects[0]
        vm.searchCriteriaStr = '';
        vm.filtered = false; //whether or not the list is filtered
        vm.loading = false;

        this.players = [];
        this.playerImgSrcPrefix = settings.fileUploadBasePath;

        this.updateList = function () {
            playersContext.searchPlayers(vm.filtered ? vm.searchCriteria : undefined).then(
            function (result) {
                vm.players = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.players = null;
            });
        }

        if (settings.useLocalData) {
            
        } else {
            vm.loading = true;
            playersContext.searchPlayers(null).then(
            function (result) {
                vm.players = result.data
                vm.loading = false
            }, function (error) {
                commonServices.handleError(error);
                vm.players = null;
                vm.loading = false
            });
        }

        vm.search = function (criteria) {
            courtContext.getCourts(criteria).then(
                function (res) {

                    vm.filtered = true;

                }, function (err) {
                    commonServices.handleError(err)
                }
            )

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