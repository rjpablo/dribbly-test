(function () {
    'user strict';

    angular.module('mainApp')
        .service('authentication',['httpService', 'settings', '$uibModal', '$document', userService]);

    function userService(httpService, settings, $uibModal, $document) {
        var _userId = '112112';
        var _username = 'RJ';
        var _token = '1234-5678-9012';

        var _isLoggedIn = function () {
            
        }

        var _register = function (userData) {
            return httpService.post(
                settings.apiBaseURL + 'Account/Register',
                {
                    Email: userData.Email,
                    Password: userData.Password,
                    ConfirmPassword: userData.ConfirmPassword
                }
            );
        }

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + encodeURIComponent(loginData.Username) + "&Password=" + encodeURIComponent(loginData.Password);

            return httpService.post(
                settings.serverRootURL + '/Token',
                data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
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
                    message: function(){
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