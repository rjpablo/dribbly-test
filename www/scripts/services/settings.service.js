(function () {
    'use strict';

    angular.module('mainApp')
        .service('settings', ['httpService', settings]);

    function settings(httpService) {
        var _runLocally = false; //run this application on localhost
        var _useLocalServer = false; //connect to local back-end server?
        var _webSiteRoot = 'http://dribblytest.x10host.com/'; //web host on which this app running
        var _localSiteRoot = 'http://localhost:8888/'; //local host on which this app running
        var _localBackEndServer = 'http://localhost:58266/';
        var _onlineBackEndServer = 'http://www.dribblytestapi.somee.com/';
        var _localIISBackEndServer = 'http://localhost/DribblyAPI/'
        var _useHtml5Mode = true; //must sync with value of $locationProvider.html5Mode() in app.config
        var _useIISServer = false;
        var _doNotUseBackend = false;
        var _useLocalData = false;
        var _siteRoot = (_runLocally?_localSiteRoot:_webSiteRoot);
        var _serverRoot = _useLocalServer ? (_useIISServer ? _localIISBackEndServer : _localBackEndServer) : _onlineBackEndServer;
        _serverRoot = _doNotUseBackend ? _siteRoot : _serverRoot
        
        //_serverRoot = 'http://localhost:58266/' //AngularJS Authentiation Project URl
        var _apiBaseUrl = _serverRoot + 'api/';
        var _imageUploadPath = _serverRoot + "files/uploads/images/";
        var _fileUploadBasePath = _serverRoot + "files/uploads/"
        var _defaultProfilePicFileName = 'default-user-image.png'
        var _defaultTeamLogoFileName = 'default-team-logo.png'
        var _defaultImagesDirectory = _serverRoot + 'files/images/defaults/'
        var _defaultProfilePicDirectory = _serverRoot + 'files/images/defaults/'
        var _defaultProfilePicUrl = _defaultProfilePicDirectory + _defaultProfilePicFileName
        var _defaultTeamLogoUrl = _defaultProfilePicDirectory + _defaultTeamLogoFileName
        var _clientId = 'dribbly-web'


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
        this.fileUploadBasePath = _fileUploadBasePath;
        this.defaultProfilePicFileName = _defaultProfilePicFileName;
        this.defaultProfilePicUrl = _defaultProfilePicUrl;
        this.defaultProfilePicDirectory = _defaultProfilePicDirectory;
        this.defaultTeamLogoUrl = _defaultTeamLogoUrl
        this.defaultTeamLogoFileName = _defaultTeamLogoFileName;
        this.defaultImagesDirectory = _defaultImagesDirectory;
        this.useHtml5Mode = _useHtml5Mode;
        this.clientId = _clientId;
        this.siteRoot = _siteRoot;
 
        return this;
    }

})();