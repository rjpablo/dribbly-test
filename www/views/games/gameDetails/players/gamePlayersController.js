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

        //User's relation to each team
        vm.userTeamARel = {}
        vm.userTeamBRel = {}

        reloadTeamPlayers();

        function getTeamPlayers(team) {
            if (team) {
                teamContext.getMembers(team.teamId).then(
                    function (res) {
                        team.members = res.data
                    }, function (err) {
                        commonServices.handleError(err)
                    })
            }
        }

        function reloadTeamPlayers() {
            getTeamPlayers(vm.teamA);
            getTeamPlayers(vm.teamB);
        }

        vm.joinTeam = function (whichTeam) {
            var teamId;
            var passwordRequired;
            var password;

            if (whichTeam.toUpperCase() == 'A') {
                teamId = vm.teamA.teamId;
                passwordRequired = vm.teamA.requiresPassword;
            } else {
                teamId = vm.teamB.teamId;
                passwordRequired = vm.teamB.requiresPassword;
            }

            if (passwordRequired) {
                password = commonServices.prompt('Enter password to join this team');
                if (password == null) {
                    return;
                }
            }

            var credentials = {
                gameId: $scope.game.gameId,
                playerId: $scope.currentUser.UserId,
                teamId: teamId,
                password: password
            }

            gameContext.joinGameAsPlayer(credentials).then(
                function (res) {
                    commonServices.toast.success('You have joined this game.')
                    reloadTeamPlayers();
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.cancelJoinTeam = function (teamId) {
            if (whichTeam.toUpperCase() == 'A') {
                vm.teamAOptionsLoading = true;
                _teamId = vm.teamA.teamId;
                vm.userTeamARel = null;
            } else {
                vm.teamBOptionsLoading = true;
                _teamId = vm.teamB.teamId;
                vm.userTeamBRel = null;
            }
            commonServices.confirm('Your request will be deleted. Do you wish to proceed?',
                function () {
                    gameContext.cancelJoinGameAsPlayer($scope.currentUser.UserId, teamId, $scope.game.gameId).then(
                    function (res) {
                        commonServices.toast.success('Request Cancelled!');
                    }, function (err) {
                        commonServices.handleError(err);
                    })
                })
        }

        vm.onTeamOptionsToggle = function (whichTeam, isOpen) {

            if (isOpen) {

                var _teamId

                if (whichTeam.toUpperCase() == 'A') {
                    vm.teamAOptionsLoading = true;
                    _teamId = vm.teamA.teamId;
                    vm.userTeamARel = null;
                } else {
                    vm.teamBOptionsLoading = true;
                    _teamId = vm.teamB.teamId;
                    vm.userTeamBRel = null;
                }
                
                gameContext.getUserToGameTeamRelation($scope.currentUser.UserId, _teamId, $scope.game.gameId).then(
                    function (res) {
                        if (whichTeam.toUpperCase() == 'A') {
                            vm.teamAOptionsLoading = false;
                            vm.userTeamARel = res.data;
                        } else {
                            vm.teamBOptionsLoading = false;
                            vm.userTeamBRel = res.data;
                        }
                    }, function (err) {
                        vm.teamBOptionsLoading = false;
                        vm.teamAOptionsLoading = false;
                        commonServices.handleError(err);
                    });

            } else {
                vm.teamAOptionsLoading = false
                vm.teamBOptionsLoading = false;
            }

            
        }
    };

})();