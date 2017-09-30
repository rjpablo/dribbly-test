﻿(function () {
    'use strict';

    angular.module('mainApp')
        .service('teamContext', ['httpService', 'settings', 'fileService', '$q', '$uibModal', teamContext]);

    function teamContext(httpService, settings, fileService, $q, $uibModal) {

        var _apiControllerBaseUrl = settings.apiBaseURL + 'Teams/'

        var _getTeams = function (filters) {
            if (filters) {
                return httpService.get(_apiControllerBaseUrl + "All", filters)
            } else {
                return httpService.get(_apiControllerBaseUrl + "All")
            }
        }

        var _getMembers = function (teamId) {
            return httpService.get(_apiControllerBaseUrl + 'Members/' + teamId)
        }

        /**
            Possible values for filter: 'upcoming', 'won', 'lost', 'all'
        **/
        var _getTeamGames = function (teamId, filter) {
            return httpService.get(_apiControllerBaseUrl + 'GetTeamGames/' + teamId + '/' + filter)
        }

        var _getTeamDetails = function (teamId) {
            return httpService.get(_apiControllerBaseUrl + 'GetTeam/' + teamId)
        }

        var _register = function (team) {
            return httpService.post(_apiControllerBaseUrl + 'Register/', team);
        }

        var _deletePhoto = function(fileName, userId) {
            return fileService.deleteTeamPhoto(fileName, userId);
        }

        var _updateTeam = function (team) {
            return httpService.put(_apiControllerBaseUrl + 'Update/', team);
        }

        var _updatePrimaryPhoto = function (teamId, fileName) {
            return httpService.put(encodeURI(_apiControllerBaseUrl + 'setPrimaryPhoto/?teamId=' + teamId + '&fileName=' + fileName));
        }

        var _searchTeams = function (criteria) {
            return httpService.get(_apiControllerBaseUrl + '/search', { searchCriteria: criteria })
        }

        var _invite = function (playerId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'InvitePlayer/' + playerId + '/' + teamId);
        }

        var _join = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'JoinTeam/' + userId + '/' + teamId);
        }

        var _leave = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'LeaveTeam/' + userId + '/' + teamId);
        }

        var _dismissPlayer = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'DismissPlayer/' + userId + '/' + teamId);
        }

        var _cancelRequest = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'cancelRequest/' + userId + '/' + teamId);
        }

        var _cancelInvitation = function (teamId, userId) {
            return httpService.post(_apiControllerBaseUrl + 'cancelInvitation/' + teamId + '/' + userId);
        }

        var _respondToInvitation = function (teamId, userId, accept) {
            return httpService.post(_apiControllerBaseUrl + 'RespondToInvitation/' + teamId + '/' + userId + '/' + accept);
        }

        var _respondToRequest = function (teamId, userId, approve) {
            return httpService.post(_apiControllerBaseUrl + 'RespondToRequest/' + teamId + '/' + userId + '/' + approve);
        }

        var _getUserToTeamRelation = function (teamId, userId) {
            return httpService.get(_apiControllerBaseUrl + 'GetUserToTeamRelation/' + teamId + '/' + userId);
        }

        var _getMemberRequests = function (teamId) {
            return httpService.get(_apiControllerBaseUrl + 'GetMemberRequests/' + teamId);
        }

        var _getMemberInvitations = function (teamId) {
            return httpService.get(_apiControllerBaseUrl + 'GetMemberInvitations/' + teamId);
        }

        var _getTestTeams = function () {
            return [
            {

            }
            ];
        }

        var _showTeamSelectorModal = function (teams, modalTitle) {
            var deferred = $q.defer()
            var courtSearchModal = $uibModal.open({
                animation: true,
                backdrop: 'static',
                windowClass: 'team-selector-modal',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/teams/shared/team-selector-modal/team-selector-modal-template.html',
                resolve: {
                    teams: function () { return teams; },
                    modalTitle: function () { return modalTitle; }
                },
                controller: function ($scope, commonServices, $uibModalInstance, $timeout, teams, modalTitle) {
                    $scope.teams = teams;
                    $scope.modalTitle = modalTitle;

                    if ($scope.teams.length == 1) {
                        $scope.selectedTeam = $scope.teams[0]
                    }

                    $scope.ok = function (e) {
                        $uibModalInstance.close($scope.selectedTeam);
                    };

                    $scope.cancel = function (e) {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: 'sm'
            });
            courtSearchModal.result.then(function (selectedTeam) {
                deferred.resolve(selectedTeam)
            }, function (reason) {
                deferred.reject()
            });

            return deferred.promise;

        }

        this.register = _register;
        this.getTeams = _getTeams;
        this.getTeamDetails = _getTeamDetails;
        this.deletePhoto = _deletePhoto;
        this.updateTeam = _updateTeam;
        this.updatePrimaryPhoto = _updatePrimaryPhoto;
        this.searchTeams = _searchTeams;
        this.getTestTeams = _getTestTeams;
        this.getMembers = _getMembers;
        this.invitePlayer = _invite;
        this.respondToInvitation = _respondToInvitation;
        this.getUserToTeamRelation = _getUserToTeamRelation;
        this.join = _join;
        this.leave = _leave;
        this.cancelRequest = _cancelRequest;
        this.dismissPlayer = _dismissPlayer;
        this.getMemberRequests = _getMemberRequests;
        this.respondToRequest = _respondToRequest;
        this.getMemberInvitations = _getMemberInvitations;
        this.cancelInvitation = _cancelInvitation;
        this.getTeamGames = _getTeamGames;
        this.showTeamSelectorModal = _showTeamSelectorModal;

        return this;

    }

})();