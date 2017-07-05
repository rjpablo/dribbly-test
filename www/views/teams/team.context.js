﻿(function () {
    'use strict';

    angular.module('mainApp')
        .service('teamContext', ['httpService', 'settings', 'fileService', '$q', teamContext]);

    function teamContext(httpService, settings, fileService, $q) {

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

        var _getTeamDetails = function (teamName) {
            return httpService.get(_apiControllerBaseUrl + 'GetTeam?teamName=' + encodeURIComponent(teamName))
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

        var _invite = function (invitation) {
            return httpService.post(_apiControllerBaseUrl + 'Invite/', invitation);
        }

        var _join = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'JoinTeam/' + userId + '/' + teamId);
        }

        var _leave = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'LeaveTeam/' + userId + '/' + teamId);
        }

        var _dismiss = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'DismissPlayer/' + userId + '/' + teamId);
        }

        var _cancelRequest = function (userId, teamId) {
            return httpService.post(_apiControllerBaseUrl + 'cancelRequest/' + userId + '/' + teamId);
        }

        var _respondToInvitation = function (teamId, userId, accept) {
            return httpService.post(_apiControllerBaseUrl + 'CancelRequest/' + teamId + '/' + userId + '/' + accept);
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

        var _getTestTeams = function () {
            return [
            {

            }
            ];
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
        this.invite = _invite;
        this.respondToInvitation = _respondToInvitation;
        this.getUserToTeamRelation = _getUserToTeamRelation;
        this.join = _join;
        this.leave = _leave;
        this.cancelRequest = _cancelRequest;
        this.dismiss = _dismiss;
        this.getMemberRequests = _getMemberRequests;
        this.respondToRequest = _respondToRequest;

        return this;

    }

})();