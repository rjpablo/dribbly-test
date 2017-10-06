(function () {
    'use strict';

    angular.module('mainApp')
        .service('gameContext', ['httpService', 'settings', 'fileService', '$q', '$uibModal', ctxFn]);

    function ctxFn(httpService, settings, fileService, $q, $uibModal) {

        var _apiCtrlBaseUrl = settings.apiBaseURL + 'Games/';

        var _getGames = function (filters) {
            if (filters) {
                return httpService.get(_apiCtrlBaseUrl, filters)
            } else {
                return httpService.get(_apiCtrlBaseUrl)
            }
        }

        var _getGameDetails = function (gameId) {
            return httpService.get(_apiCtrlBaseUrl + 'GetGameDetails/' + gameId)
        }

        var _getRequestingTeams = function (gameId) {
            return httpService.get(_apiCtrlBaseUrl + 'GetRequestingTeams/' + gameId)
        }

        var _create = function (court) {
            return httpService.post(_apiCtrlBaseUrl + 'Create/', court);
        }

        var _deletePhoto = function (fileName, userId) {
            return fileService.deleteCourtPhoto(fileName, userId);
        }

        var _updateGame = function (court) {
            return httpService.put(_apiCtrlBaseUrl + 'update/', court);
        }

        var _searchGames = function (criteria) {
            return httpService.get(_apiCtrlBaseUrl + 'search', { searchCriteria: criteria })
        }

        var _getTestGames = function () {
            return [{
                gameId: 0,
                title: 'Test Game 001',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: null,
                court: {
                    id: 18,
                    name: 'Ballers Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Test Team 2',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            },
            {
                gameId: 0,
                title: 'Test Game 002',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: 1,
                court: {
                    id: 18,
                    name: 'Ballers Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Team with long Name',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Test Team 2',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            },
            {
                gameId: 0,
                title: 'Test Game 003',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: 2,
                court: {
                    id: 18,
                    name: 'Kamakawili Habululu Basketball Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Team with long Name',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            }]
        }

        var _cancelJoinGameAsPlayer = function (userId, teamId, gameId) {
            return httpService.post(_apiCtrlBaseUrl + 'CancelJoinGameAsPlayer/' + userId + '/' + teamId + '/' + gameId)
        }

        var _leaveGameAsPlayer = function (userId, teamId, gameId) {
            return httpService.post(_apiCtrlBaseUrl + 'leaveGameAsPlayer/' + userId + '/' + teamId + '/' + gameId)
        }

        var _joinGameAsPlayer = function (credentials) {
            return httpService.post(_apiCtrlBaseUrl + 'JoinGameAsPlayer', credentials)
        }

        var _joinGameAsTeam = function (credentials) {
            return httpService.post(_apiCtrlBaseUrl + 'JoinGameAsTeam', credentials)
        }

        var _rejectJoinAsTeamRequest = function (requestId, banUser) {
            return httpService.post(_apiCtrlBaseUrl + 'RejectJoinAsTeamRequest/' + requestId + '/' + banUser);
        }

        var _approveJoinAsTeamRequest = function (requestId) {
            return httpService.post(_apiCtrlBaseUrl + 'ApproveJoinAsTeamRequest/' + requestId);
        }

        var _cancelRequestToJoinAsTeam = function (gameId, userId) {
            return httpService.post(_apiCtrlBaseUrl + 'CancelRequestToJoinAsTeam/' + gameId + '/' + userId)
        }

        var _leaveGameAsTeam = function (gameId, teamId) {
            return httpService.post(_apiCtrlBaseUrl + 'LeaveGameAsTeam/' + gameId + '/' + teamId)
        }

        var _getUserToGameTeamRelation = function (userId, teamId, gameId) {
            return httpService.get(_apiCtrlBaseUrl + 'GetUserToGameTeamRelation/' + userId + '/' + teamId + '/' + gameId)
        }

        var _getUserToGameRelation = function (userId, gameId) {
            return httpService.get(_apiCtrlBaseUrl + 'GetUserToGameRelation/' + userId + '/' + gameId)
        }
        
        var _kickGameTeam = function (gameId, teamId) {
            return httpService.post(_apiCtrlBaseUrl + 'KickGameTeam/' + gameId + '/' + teamId)
        }

        var _showJoinAsTeamModal = function (teams, game) {
            var deferred = $q.defer()
            var courtSearchModal = $uibModal.open({
                animation: true,
                backdrop: 'static',
                windowClass: 'join-as-team-modal',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/games/shared/join-as-team-modal/join-as-team-modal-template.html',
                resolve: {
                    teams: function () { return teams; },
                    game: function () { return game; }
                },
                controller: function ($scope, commonServices, $uibModalInstance, $timeout, teams, game) {
                    $scope.teams = teams;
                    $scope.password = ''
                    $scope.game = game;

                    if ($scope.teams.length == 1) {
                        $scope.selectedTeam = $scope.teams[0]
                    }

                    $scope.ok = function (e) {
                        var result = {
                            selectedTeamId: $scope.selectedTeam.teamId,
                            password: $scope.password
                        }
                        $uibModalInstance.close(result);
                    };

                    $scope.cancel = function (e) {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: 'sm'
            });
            courtSearchModal.result.then(function (res) {
                deferred.resolve(res)
            }, function (reason) {
                deferred.reject()
            });

            return deferred.promise;

        }

        this.create = _create;
        this.getGames = _getGames;
        this.getGameDetails = _getGameDetails;
        this.deletePhoto = _deletePhoto;
        this.updateGame = _updateGame;
        this.searchGames = _searchGames;
        this.getTestGames = _getTestGames;
        this.joinGameAsPlayer = _joinGameAsPlayer;
        this.joinGameAsTeam = _joinGameAsTeam;
        this.cancelJoinGameAsPlayer = _cancelJoinGameAsPlayer;
        this.getUserToGameTeamRelation = _getUserToGameTeamRelation;
        this.getUserToGameRelation = _getUserToGameRelation;
        this.leaveGameAsPlayer = _leaveGameAsPlayer;
        this.cancelRequestToJoinAsTeam = _cancelRequestToJoinAsTeam;
        this.showJoinAsTeamModal = _showJoinAsTeamModal;
        this.getRequestingTeams = _getRequestingTeams;
        this.rejectJoinAsTeamRequest = _rejectJoinAsTeamRequest;
        this.approveJoinAsTeamRequest = _approveJoinAsTeamRequest;
        this.leaveGameAsTeam = _leaveGameAsTeam;
        this.kickGameTeam = _kickGameTeam;

        return this;

    }

})();