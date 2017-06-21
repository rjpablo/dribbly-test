(function()
{
    'use strict';

    angular.module('mainApp')
        .service('playersContext', ['httpService', 'settings', 'fileService', '$q', serviceFn]);

    function serviceFn(httpService, settings, fileService, $q) {

        var apiControllerBaseURL = settings.apiBaseURL + 'Players/';

        var _searchPlayers = function (criteria) {
            return httpService.post(apiControllerBaseURL + 'Search', criteria)
        }

        var _addPlayer = function (playerDetails) {
            return httpService.post(apiControllerBaseURL + 'Add', playerDetails)
        }

        var _getTestProfiles = function () {
            return [
                {
                    userId: '238439-3454-34-554',
                    userName: 'Test0001',
                    sex: 'M',
                    dateJoined: new Date(),
                    address: '#243 Ben Harrison St. Pio Del Pilar, Makati City, Metro Manila',
                    heightFt: 5,
                    heightIn: 6
                }
            ]
        }

        this.getTestProfiles = _getTestProfiles;
        this.addPlayer = _addPlayer;
        this.searchPlayers = _searchPlayers;

        return this;

    }

})();