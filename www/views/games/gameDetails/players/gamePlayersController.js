(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gamePlayersCtrl', ['$scope', '$uibModal', '$document', 'settings',
            'commonServices', '$timeout', '$log', 'gameContext', 'teamContext', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings,
        commonServices, $timeout, $log, gameContext, teamContext) {

        var vm = this;

        vm.teamA = $scope.game.teamA
        vm.teamB = $scope.game.teamB

        getTeamPlayers(vm.teamA);
        getTeamPlayers(vm.teamB);

        function getTeamPlayers(team) {
            teamContext.getMembers(team.teamId).then(
                function (res) {
                    team.members = res.data
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

    };

})();