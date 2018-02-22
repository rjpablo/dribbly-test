(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gameDetailsCtrl', ['$scope', '$uibModal', '$document', 'settings', '$state',
            'httpService', 'commonServices', '$timeout', '$log', 'gameContext', '$stateParams', 'profileContext', 'teamContext', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings, $state, httpService,
        commonServices, $timeout, $log, gameContext, $stateParams, profileContext, teamContext) {

        var vm = this;

        this.imageUploadPath = settings.imageUploadPath;

        vm.gameId = $stateParams.gameId;
        vm.gameOptionsLoading = false;
        vm.userGameRelation = null;
        vm.dropDownIsOpen = false;

        function LoadGameDetails() {
            gameContext.getGameDetails(vm.gameId).then(
            function (res) {
                $scope.game = res.data;
                commonServices.setPageTitle($scope.game.title + ' - Game Details')
            }, function (err) {
                commonServices.handleError(err);
            })
        }

        LoadGameDetails()

        vm.gameOptionsToggled = function () {
            if (vm.dropDownIsOpen) {
                vm.gameOptionsLoading = true;
                gameContext.getUserToGameRelation($scope.currentUser.UserId, vm.gameId).then(
                    function (res) {
                        vm.gameOptionsLoading = false;
                        vm.userGameRelation = res.data;
                    }, function (err) {
                        vm.gameOptionsLoading = false;
                        vm.userGameRelation = null;
                    });                
            }
            
        }

        vm.cancelRequestAsTeam = function () {
            gameContext.cancelRequestToJoinAsTeam(vm.gameId, $scope.currentUser.UserId).then(
                function (res) {
                    $scope.$broadcast('game-team-request-cancelled')
                    commonServices.toast.success('Request cancelled')
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

        vm.leaveGameAsTeam = function () {
            var managedTeam;
            if ($scope.game.teamA && $scope.game.teamA.managerId == $scope.currentUser.UserId) {
                managedTeam = $scope.game.teamA;
            } else if ($scope.game.teamB && $scope.game.teamB.managerId == $scope.currentUser.UserId) {
                managedTeam = $scope.game.teamB;
            }

            if (managedTeam) {
                commonServices.confirm('Your team, ' + managedTeam.teamName + ' will be removed from the game.',
                    function () {
                        gameContext.leaveGameAsTeam(vm.gameId, managedTeam.teamId).then(
                        function (res) {
                            LoadGameDetails();
                            commonServices.toast.success(managedTeam.teamName + ' has been removed from the game')
                        }, function (err) {
                            commonServices.handleError(err)
                        })
                    })
                
            } else {
                commonServices.toast.error('None of the teams in this is managed by you.');
            }
        }

        vm.joinAsTeam = function () {
            profileContext.getManagedTeams($scope.currentUser.UserId).then(
                function (res) {
                    gameContext.showJoinAsTeamModal(res.data, $scope.game).then(
                        function (res) {
                            var creds = {
                                gameId: vm.gameId,
                                teamId: res.selectedTeamId,
                                userId: $scope.currentUser.UserId,
                                password: res.password
                            }
                            gameContext.joinGameAsTeam(creds).then(
                                function (joinResult) {
                                    commonServices.toast.success('Request sent!')
                                    $scope.$broadcast('game-team-request-added')
                                }, function (err) {
                                    commonServices.handleError(err)
                                })
                        }, function(res){

                        })
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

        vm.setGameStatus = function (status) {
            gameContext.setGameStatus($scope.game.gameId, status).then(
                function (res) {
                    $scope.game.status = status;
                    commonServices.toast.success('Game status updated!');
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.postGameResult = function (isEdit) {
            gameContext.postGameResult($scope.game, isEdit).then(
                function (res) {
                    if (res != null) {
                        $scope.game.teamAScore = res.teamAScore;
                        $scope.game.teamBScore = res.teamBScore;
                        $scope.game.winningTeamId = res.winningTeamId;
                        $scope.game.isOver = true;
                    } //else, operation was cancelled             
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        vm.removeGameResult = function () {
            commonServices.confirm("Remove game result?",function(){
                gameContext.removeGameResult($scope.game.gameId).then(
                function (res) {
                    if (res != null) {
                        $scope.game.teamAScore = 0;
                        $scope.game.teamBScore = 0;
                        $scope.game.winningTeamId = null;
                        $scope.game.isOver = false;
                    } //else, operation was cancelled             
                }, function (err) {
                    commonServices.handleError(err);
                })
            })
            
        }

        vm.cancelGame = function () {
            commonServices.confirm("The game will be cancelled.", function () {
                gameContext.cancelGame($scope.game.gameId).then(
                function (res) {
                    commonServices.toast.success('The game has been cancelled.');
                    $state.go('games.all');
                }, function (err) {
                    commonServices.handleError(err);
                })
            })

        }

        var removeReloadGameDetailsListener = $scope.$on('reload-game-details', function () {
            LoadGameDetails();
        })

        $scope.$on('$destroy', function () {
            removeReloadGameDetailsListener();
        })
    };

})();