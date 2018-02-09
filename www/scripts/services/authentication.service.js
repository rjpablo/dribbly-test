(function () {
    'use strict';

    angular.module('mainApp')
        .service('authentication', ['httpService', 'settings', '$uibModal',
            '$document', '$q', '$localStorage', '$http', '$rootScope', 'commonServices', '$location', userService]);

    //refer to http://bitoftech.net/2014/06/09/angularjs-token-authentication-using-asp-net-web-api-2-owin-asp-net-identity/
    //for the implementation of the authentication process
    function userService(httpService, settings, $uibModal,
        $document, $q, $localStorage, $http, $rootScope, commonServices, $location) {
        var authorizationData = $localStorage.authorizationData;
        var _userId = '112112';
        var _username = 'RJ';
        var _token = '1234-5678-9012';
        var _isAuthenticated = false;
        var _currentUser = null;

        var baseURL = settings.apiBaseURL + 'Account/';

        var _isLoggedIn = function () {

        }

        var _checkAuthentication = function (message) {
            
            var deferred = $q.defer()

            if (_currentUser) {
                deferred.resolve(_currentUser)
            } else {
                _showLoginModal(message).then(function (res) {
                    deferred.resolve(_currentUser)
                }, function (res) {
                    deferred.reject()
                })
            }

            return deferred.promise;

        }

        var _retrieveSavedAuthData = function () {
            var authData = $localStorage.authorizationData
        }

        var _getCurrentUser = function () {
            if (settings.useLocalData) {
                _currentUser = {
                    Username: 'Test',
                    UserId: 'test-user'
                }
                return _currentUser;
            }
            if (!_currentUser){
                var authData = $localStorage.authorizationData;
                if (authData && authData.UserId) {
                    //TODO: Check if token is still valid
                    _currentUser = {
                        Username: authData.Username,
                        UserId: authData.UserId
                    }
                } else {
                    return null;
                }
            }
            return _currentUser;
        }

        var _register = function (userData) {
            return httpService.post(
                baseURL + 'Register',
                {
                    Username: userData.Username,
                    Email: userData.Email,
                    Password: userData.Password,
                    ConfirmPassword: userData.ConfirmPassword
                },
                false
            );
        }

        var _getCurrentUserId = function () {
            return httpService.get(
                baseURL + 'CurrentUserId'
            );
        }

        var _login = function (loginData) {

            var deffered = $q.defer();

            var data = "grant_type=password&username=" + encodeURIComponent(loginData.Username) + "&Password=" + encodeURIComponent(loginData.Password) + '&client_id=dribbly-web';

            $http.post(
                settings.serverRootURL + '/Token',
                data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            ).then(function (response) {

                $localStorage.authorizationData = {
                    Token: response.data.access_token,
                    Username: response.data.userName,
                    refreshToken: response.data.refresh_token,
                    UseRefreshTokens: true,
                    StaySignedIn: loginData.StaySignedIn,
                    UserId: response.data.userId
                };

                _currentUser = {
                    Username: response.data.userName,
                    UserId: response.data.userId
                }

                $rootScope.$broadcast('AUTHORIZATION_SUCCESSFUL', _currentUser);

                deffered.resolve(_currentUser);
                
            }, function (response) {
                $rootScope.$broadcast('AUTHORIZATION_FAILED');
                deffered.reject(response);
            });

            return deffered.promise;
        }

        var _registerExternal = function (registerExternalData) {

            var deferred = $q.defer();

            $http.post(baseURL + 'registerexternal', registerExternalData).then(function (response) {

                $localStorage.authorizationData = {
                    Token: response.data.access_token,
                    Username: response.data.userName,
                    refreshToken: "",
                    UseRefreshTokens: true,
                    StaySignedIn: true,
                    UserId: response.data.userId
                };

                _currentUser = {
                    Username: response.data.userName,
                    UserId: response.data.userId
                }

                $rootScope.$broadcast('AUTHORIZATION_SUCCESSFUL', _currentUser);

                deferred.resolve(response);

            }, function (err, status) {
                _clearAuthData()
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logout = function () {
            var deferred = $q.defer();
            _clearAuthData()
            $location.path('courts/')
            $rootScope.$broadcast('LOGGED_OUT');
            commonServices.toast.info('You have been logged out.');

            return deferred.promise;
        }

        var _showLoginModal = function (message) {

            var parentElem = angular.element($document[0].querySelector('body'));
            var loginModal = $uibModal.open({
                animation: true,
                backdrop: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/views/account/loginDialog/loginDialog.html',
                controller: 'loginDialogCtrl',
                controllerAs: 'loginCtrl',
                resolve: {
                    message: function () {
                        return message
                    }
                },
                size: 'md',
                appendTo: parentElem,
                windowClass: 'login-modal'
            });

            return loginModal.result;

        }

        var _obtainAccessToken = function (externalData) {

            var deferred = $q.defer();

            $http.get(baseURL + 'ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).then(function (response) {

                $localStorage.authorizationData = {
                    Token: response.data.access_token,
                    Username: response.data.userName,
                    refreshToken: response.data.refresh_token,
                    UseRefreshTokens: true,
                    StaySignedIn: true,
                    UserId: response.data.userId
                };

                _currentUser = {
                    Username: response.data.userName,
                    UserId: response.data.userId
                }

                $rootScope.$broadcast('AUTHORIZATION_SUCCESSFUL', _currentUser);

                //localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                //_authentication.isAuth = true;
                //_authentication.userName = response.userName;
                //_authentication.useRefreshTokens = false;

                deferred.resolve(response);

            }, function (err, status) {
                _clearAuthData();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _clearAuthData = function () {
            _currentUser = null;
            delete $localStorage.authorizationData
        }

        var _refreshToken = function (config) {
            var deferred = $q.defer();

            var authData = $localStorage.authorizationData;

            if (authData) {

                if (authData.UseRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=dribbly-web";

                    delete $localStorage.authorizationData;

                    $http.post(settings.serverRootURL + '/Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                        $localStorage.authorizationData = {
                            Token: response.data.access_token,
                            Username: response.data.userName,
                            refreshToken: response.data.refresh_token,
                            UseRefreshTokens: true,
                            StaySignedIn: false,
                            UserId: response.data.userId
                        };

                        deferred.resolve(response);

                    }, function (err, status) {
                        _logout();
                        deferred.reject(err);
                    });
                }
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        //variables

        //functions
        this.register = _register;
        this.login = _login;
        this.logout = _logout;
        this.isLoggedIn = _isLoggedIn;
        this.showLoginModal = _showLoginModal;
        this.getCurrentUser = _getCurrentUser;
        this.checkAuthentication = _checkAuthentication;
        this.refreshToken = _refreshToken;
        this.clearAuthData = _clearAuthData;
        this.registerExternal = _registerExternal;
        this.obtainAccessToken = _obtainAccessToken;

    }

})();