(function () {
    'user strict';

    angular.module('mainApp')
        .service('authentication',['$http', userService]);

    function userService($http) {
        var _userId = '112112';
        var _username = 'RJ';
        var _token = '1234-5678-9012';

        var _isLoggedIn = function () {
            
        }

        var _login = function () {

        }

        var _logout = function () {

        }

        //variables
        this.userId = _userId;
        this.username = _username;
        this.token = _token;
        
        //functions
        this.login = _login;
        this.logout = _logout;
        this.isLoggedIn = _isLoggedIn;

    }

})();