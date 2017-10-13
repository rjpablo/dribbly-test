(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('playerProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', 'profileContext', 'playersContext', 'filterFilter', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, profileContext, playersContext, filterFilter) {

        var vm = this;
        vm.teamFilter;
        vm.filteredTeams = [];
        vm.currentTeamFilter = { isCurrentMember: true };
        vm.previousTeamFilter = { isCurrentMember: false };

        profileContext.getPlayerProfile($scope.profile.details.userId).then(
            function (res) {
                if (res.data) {
                    $scope.profile.player = res.data;
                    vm.filterTeams('current');
                } else {

                }
            }, function (err) {
                commonServices.handleError(err)
            })

        vm.setPlayerProfile = function () {
            playersContext.addPlayer(
                {
                    userId: $scope.profile.details.userId,
                    dateCreated: new Date()
                }).then(function (res) {
                    if (res.data) {
                        $scope.profile.player = res.data;
                    } else {
                        commonServices.toast.error("Creation of player profile failed. Please try again.")
                    }
                }, function (err) {
                    commonServices.handleError(err)
                })
        }
        vm.filterTeams = function (filter) {
            vm.teamFilter = filter;
            if (filter == 'current') {
                vm.filteredTeams = filterFilter($scope.profile.player.teams, vm.currentTeamFilter);
            } else if (filter == 'previous') {
                vm.filteredTeams = filterFilter($scope.profile.player.teams, vm.previousTeamFilter);
            } else {
                vm.filteredTeams = $scope.profile.player.teams
            }
        }

    };

})();