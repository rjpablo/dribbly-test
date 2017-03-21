(function () {
    'user strict';

    angular.module('mainApp')
        .service('settings', settings);

    function settings() {
        var _apiBaseUrl = 'http://localhost:52964/api/';
        var _onTestingMode = true;

        this.onTestingMode = _onTestingMode;
        this.apiBaseURL = _apiBaseUrl;

        return this;
    }

})();