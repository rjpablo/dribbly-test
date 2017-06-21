(function () {
    'use strict';

    angular.module('mainApp')
        .service('httpService', ['$http', '$localStorage', genericService]);

    function genericService($http, $localStorage) {
        var _get = function (url, data, addAuthHeader) {
            var headers = {};
            if (addAuthHeader !== false) {
                var userData = $localStorage.authorizationData;
                if (userData) {
                    headers = { 'Authorization': 'Bearer ' + userData.Token}
                }
            }

            return $http({
                    method: 'GET',
                    url: url,
                    headers: headers,
                    params: data
                });
        }
        var _post = function (url, data, addAuthHeader) {
            var headers = {};
            if (addAuthHeader !== false) {
                var userData = $localStorage.authorizationData;
                if (userData) {
                    headers = { 'Authorization': 'Bearer ' + userData.Token }
                }
            }

            return $http.post(url, data, { headers: headers });
        }

        var _put = function (url, data, addAuthHeader) {
            var headers = {};
            if (addAuthHeader !== false) {
                var userData = $localStorage.authorizationData;
                if (userData) {
                    headers = { 'Authorization': 'Bearer ' + userData.Token }
                }
            }

            return $http.put(url, data, { headers: headers });
        }

        var _delete = function (url, data, addAuthHeader) {
            var headers = {};
            if (addAuthHeader !== false) {
                var userData = $localStorage.authorizationData;
                if (userData) {
                    headers = { 'Authorization': 'Bearer ' + userData.Token }
                }
            }
            return $http.delete(url, data, { headers: headers });
        }

        this.get = _get;
        this.post = _post;
        this.delete = _delete;
        this.put = _put;

    }

})();