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

        var _deletePhoto = function(fileName) {
            return fileService.deleteCourtPhoto(fileName);
        }


        this.register = _register;
        this.getCourts = _getCourts;
        this.getCourtDetails = _getCourtDetails;
        this.deletePhoto = _deletePhoto;

        return this;

    }

})();