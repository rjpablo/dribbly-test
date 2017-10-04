(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gameRequestCtrl', ['$scope', '$uibModal', '$document', 'settings',
            'commonServices', '$log', 'gameContext', 'teamContext', '$rootScope', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings,
        commonServices, $log, gameContext, teamContext, $rootScope) {

        var vm = this;

        vm.requestingTeams = [];

        var getRequestingTeams = function () {
            gameContext.getRequestingTeams($scope.game.gameId).then(
                function (res) {
                    vm.requestingTeams = res.data;
                }, function (err) {
                    commonServices.handlerError(err);
                })
        }

        getRequestingTeams();

        vm.rejectJoinAsTeamRequest = function (request) {
            gameContext.rejectJoinAsTeamRequest(request.id, false).then(
                function (res) {
                    vm.requestingTeams.splice(vm.requestingTeams.indexOf(request))
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.approveJoinAsTeamRequest = function (request) {
            gameContext.approveJoinAsTeamRequest(request.id).then(
                function (res) {
                    $rootScope.$broadcast('reload-game-details')
                    vm.requestingTeams.splice(vm.requestingTeams.indexOf(request))
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        //This event is fired from gameDetailsController
        var removeGameTeamRequestAddedListener = $scope.$on('game-team-request-added', function () {
            getRequestingTeams();
        })

        var removeGameTeamRequestCancelledListener = $scope.$on('game-team-request-cancelled', function () {
            getRequestingTeams();
        })

        $scope.$on('$destroy', function () {
            removeGameTeamRequestAddedListener();
            removeGameTeamRequestCancelledListener();
        })
                
    };

})();