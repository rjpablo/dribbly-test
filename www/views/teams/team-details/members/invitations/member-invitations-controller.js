(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamMemberInvitationsController', ['$scope', 'settings', 'commonServices',
            'authentication', 'teamContext', '$uibModal', '$rootScope', controllerFn]);

    function controllerFn($scope, settings, commonServices, authentication, teamContext, $uibModal, $rootScope) {

        var vm = this;
        vm.loadingInvitations = true;

        function loadInvitations(teamId) {
            vm.loadingInvitations = true
            teamContext.getMemberInvitations(teamId).then(
            function (res) {
                vm.loadingInvitations = false;
                $scope.team.invitations = res.data
            }, function (err) {
                vm.loadingInvitations = false;
                commonServices.handleError(err)
            })
        }

        $scope.$watch('team.details', function (teamDetails) {
            if (teamDetails) {
                loadInvitations(teamDetails.teamId);
            }
        })

        var removeListerReloadTeamInvitations = $scope.$on('reload-team-invitations', function () {
            loadInvitations($scope.team.details.teamId);
        })

        $scope.$on('$destroy', function () {
            removeListerReloadTeamInvitations()
        })

    };

})();