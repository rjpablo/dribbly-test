(function()
{
    'user strict';

    angular.module('mainApp')
        .service('playersContext', ['httpService', 'settings', 'fileService', '$q', serviceFn]);

    function serviceFn(httpService, settings, fileService, $q) {

        var _addPlayer = function (playerDetails) {
            return httpService.post(settings.apiBaseURL + 'Players/Add',playerDetails)
        }

        var _getProfileByName = function (userName) {
            return httpService.get(settings.apiBaseURL + 'UserProfiles/' + encodeURIComponent(userName))
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

        var _updateProfile = function (profile) {
            return httpService.put(settings.apiBaseURL + 'UserProfiles/Update', profile)
        }

        this.getTestProfiles = _getTestProfiles;
        this.getProfileByName = _getProfileByName;
        this.updateProfile = _updateProfile;
        this.addPlayer = _addPlayer;

        return this;

    }

})();