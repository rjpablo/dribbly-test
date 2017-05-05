(function () {
    'user strict';

    angular.module('mainApp')
        .service('courtContext', ['httpService', 'settings', 'fileService', courtContext]);

    function courtContext(httpService, settings, fileService) {
        var _getCourts = function () {
            return httpService.get(settings.apiBaseURL + 'courts')
        }

        var _getCourtDetails = function (courtId) {
            return httpService.get(settings.apiBaseURL + 'court', {courtId : courtId})
        }

        var _register = function (court) {
            return httpService.post(settings.apiBaseURL + 'court/register/', court);
        }

        var _deletePhoto = function(fileName, userId) {
            return fileService.deleteCourtPhoto(fileName, userId);
        }

        var _updateCourt = function (court) {
            return httpService.put(settings.apiBaseURL + 'court/update/', court);
        }

        var _updatePrimaryPhoto = function (courtId, fileName) {
            return httpService.put(encodeURI(settings.apiBaseURL + 'court/setPrimaryPhoto/?courtId=' + courtId + '&fileName=' + fileName));
        }

        var _searchCourts = function (criteria) {
            return httpService.get(settings.apiBaseURL + 'courts/search', { searchCriteria: criteria })
        }

        this.register = _register;
        this.getCourts = _getCourts;
        this.getCourtDetails = _getCourtDetails;
        this.deletePhoto = _deletePhoto;
        this.updateCourt = _updateCourt;
        this.updatePrimaryPhoto = _updatePrimaryPhoto;
        this.searchCourts = _searchCourts;

        return this;

    }

})();