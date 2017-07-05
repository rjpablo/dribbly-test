(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamMemberRequestsController', ['$scope', 'settings', 'commonServices',
            'authentication', 'teamContext', '$uibModal', '$rootScope', controllerFn]);

    function controllerFn($scope, settings, commonServices, authentication, teamContext, $uibModal, $rootScope) {

        var vm = this;
        vm.loadingRequests = true;

        function loadRequests(teamId) {
            vm.loadingRequests = true
            teamContext.getMemberRequests(teamId).then(
            function (res) {
                vm.loadingRequests = false;
                $scope.team.requests = res.data
            }, function (err) {
                vm.loadingRequests = false;
                commonServices.handleError(err)
            })
        }

        $scope.$watch('team.details', function (teamDetails) {
            if (teamDetails) {
                loadRequests(teamDetails.teamId);
            }
        })

        var removeListerUpdateTeamRequests = $scope.$on('update-team-requests', function () {
            loadRequests($scope.team.details.teamId);
            $rootScope.$broadcast('reload-team-members');
        })

        $scope.$on('$destroy', function () {
            removeListerUpdateTeamRequests()
        })


    };

})();