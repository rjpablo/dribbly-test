(function () {
    'user strict';

    angular.module('mainApp')
        .service('settings', settings);

    function settings() {
        var _apiBaseUrl = 'http://localhost:52964/api/';

        this.apiBaseURL = _apiBaseUrl;

        return this;
    }

})();