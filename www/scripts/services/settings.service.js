(function () {
    'user strict';

    angular.module('mainApp')
        .service('settings', ['httpService', settings]);

    function settings(httpService) {
        var _useLocalServer = true;
        var _doNotUseBackend = false;
        var _useLocalData = false;
        var _serverRoot = _useLocalServer ? 'http://localhost:58266/' : 'http://drbly-test.somee.com/';
        _serverRoot = _doNotUseBackend ? 'http://localhost:8888/' : _serverRoot
        
        //_serverRoot = 'http://localhost:58266/' //AngularJS Authentiation Project URl
        var _apiBaseUrl = _serverRoot + 'api/';
        var _imageUploadPath = _serverRoot + "files/uploads/images/";


        //Use this when no backend server is running
        //var _imageUploadPath = 'http://localhost:8888/images/uploads/courts/';

        var getSettingsFromServer = function () {
            httpService.get(_apiBaseUrl + 'settings/').then(
                function (result) {
                    console.log(result.data);
                }, function (error) {
                    console.log(error.message);
                });
        }

        //getSettingsFromServer();

        this.useLocalServer = _useLocalServer;
        this.useLocalData = _useLocalData;
        this.apiBaseURL = _apiBaseUrl;
        this.serverRootURL = _serverRoot;
        this.imageUploadPath = _imageUploadPath;

        return this;
    }

})();