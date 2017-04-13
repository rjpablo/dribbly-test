(function () {
    'user strict';

    angular.module('mainApp')
        .service('authentication', ['httpService', 'settings', '$uibModal', '$document', '$q', '$localStorage', '$http', '$rootScope', userService]);

    function userService(httpService, settings, $uibModal, $document, $q, $localStorage, $http, $rootScope) {
        var authorizationData = $localStorage.authorizationData;
        var _userId = '112112';
        var _username = 'RJ';
        var _token = '1234-5678-9012';

        var baseURL = settings.apiBaseURL + 'Account/';

        var _isLoggedIn = function () {

        }

        var _register = function (userData) {
            return httpService.post(
                baseURL + 'Register',
                {
                    Username: userData.Username,
                    Email: userData.Email,
                    Password: userData.Password,
                    ConfirmPassword: userData.ConfirmPassword
                }
            );
        }

        var _getCurrentUserId = function () {
            return httpService.get(
                baseURL + 'CurrentUserId'
            );
        }

        var _login = function (loginData) {

            var deffered = $q.defer();

            var data = "grant_type=password&username=" + encodeURIComponent(loginData.Username) + "&Password=" + encodeURIComponent(loginData.Password);

            return $http.post(
                settings.serverRootURL + '/Token',
                data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            ).then(function (response) {
                $localStorage.authorizationData = { Token: response.data.access_token, UserName: response.data.userName, refreshToken: "", UseRefreshTokens: false, StaySignedIn: loginData.StaySignedIn };

                _getCurrentUserId().then(function (res) {
                    var user = {
                        Username: loginData.Username,
                        UserId: res.data
                    }

                    $rootScope.$broadcast('AUTHORIZATION_SUCCESSFUL', user);
                    deffered.resolve(user)

                }, function (userId) {
                    $rootScope.$broadcast('AUTHORIZATION_FAILED');
                    deffered.reject();
                });
                
            }, function (response) {
                $rootScope.$broadcast('AUTHORIZATION_FAILED');
                deffered.reject(response);
            });

            return deffered.promise;
        }

        var _logout = function () {

        }

        var _showLoginModal = function (message) {
            var parentElem = angular.element($document[0].querySelector('body'));
            var addCourtModal = $uibModal.open({
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

            return addCourtModal.result;
        }

        //variables
        this.userId = _userId;
        this.username = _username;
        this.token = _token;

        //functions
        this.register = _register;
        this.login = _login;
        this.logout = _logout;
        this.isLoggedIn = _isLoggedIn;
        this.showLoginModal = _showLoginModal;

    }

})();