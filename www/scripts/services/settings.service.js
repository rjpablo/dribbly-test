(function () {
    'user strict';

    angular.module('mainApp')
        .service('settings',['genericService', settings]);

    function settings(genericService) {
        var _onTestingMode = false;
        var _useLocalData = false;
        var _serverRoot = _onTestingMode ? 'http://localhost:52964/': 'http://drbly-test.somee.com/';
        var _apiBaseUrl = _serverRoot + 'api/';
        var _imageUploadPath = _serverRoot + "files/uploads/images/";

        var getSettingsFromServer = function () {
            genericService.get(_apiBaseUrl + 'settings/').then(
                function (result) {
                    console.log(result.data);
                }, function (error) {
                    console.log(error.message);
                });
        }

        //getSettingsFromServer();

        this.onTestingMode = _onTestingMode;
        this.useLocalData = _useLocalData;
        this.apiBaseURL = _apiBaseUrl;
        this.serverRootURL = _serverRoot;
        this.imageUploadPath = _imageUploadPath;

        return this;
    }

})();