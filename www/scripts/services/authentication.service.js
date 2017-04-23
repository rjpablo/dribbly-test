(function () {
    'user strict';

    angular.module('mainApp')
        .service('authentication', ['httpService', 'settings', '$uibModal',
            '$document', '$q', '$localStorage', '$http', '$rootScope', 'commonServices', userService]);

    function userService(httpService, settings, $uibModal,
        $document, $q, $localStorage, $http, $rootScope, commonServices) {
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
                    UseRefreshTokens: false,
                    StaySignedIn: loginData.StaySignedIn,
                    UserId: response.data.userId
                };

                _currentUser = {
                    Username: loginData.Username,
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

        var _logout = function () {
            var deferred = $q.defer();

            httpService.post(
                baseURL + 'Logout'
            ).then(function (result) {
                deferred.resolve()
            }, function () {
                deferred.reject()
            })

            _currentUser = null;
            delete $localStorage.authorizationData
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
                templateUrl: '/views/account/login/login.html',
                controller: 'loginCtrl',
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

        //variables

        //functions
        this.register = _register;
        this.login = _login;
        this.logout = _logout;
        this.isLoggedIn = _isLoggedIn;
        this.showLoginModal = _showLoginModal;
        this.getCurrentUser = _getCurrentUser;
        this.checkAuthentication = _checkAuthentication;

    }

})();