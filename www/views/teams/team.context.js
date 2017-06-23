(function () {
    'use strict';

    angular.module('mainApp')
        .service('teamContext', ['httpService', 'settings', 'fileService', '$q', teamContext]);

    function teamContext(httpService, settings, fileService, $q) {

        var _apiControllerBaseUrl = settings.apiBaseURL + 'Teams/'

        var _getTeams = function (filters) {
            if (filters) {
                return httpService.get(_apiControllerBaseUrl, filters)
            } else {
                return httpService.get(_apiControllerBaseUrl)
            }
        }

        var _getTeamDetails = function (teamId) {
            return httpService.get(_apiControllerBaseUrl, { teamId: teamId })
        }

        var _register = function (team) {
            return httpService.post(_apiControllerBaseUrl + 'Register/', team);
        }

        var _deletePhoto = function(fileName, userId) {
            return fileService.deleteTeamPhoto(fileName, userId);
        }

        var _updateTeam = function (team) {
            return httpService.put(_apiControllerBaseUrl + 'update/', team);
        }

        var _updatePrimaryPhoto = function (teamId, fileName) {
            return httpService.put(encodeURI(_apiControllerBaseUrl + 'setPrimaryPhoto/?teamId=' + teamId + '&fileName=' + fileName));
        }

        var _searchTeams = function (criteria) {
            return httpService.get(_apiControllerBaseUrl + '/search', { searchCriteria: criteria })
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

        return this;

    }

})();