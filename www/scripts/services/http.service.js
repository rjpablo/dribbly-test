(function () {
    'user strict';

    angular.module('mainApp')
        .service('httpService', ['$http', '$localStorage', genericService]);

    function genericService($http, $localStorage) {
        var _get = function (url, data) {
            var userData = $localStorage.authorizationData;
            //return $http.get(url, data, { Authorization: 'Bearer ' + userData.Token });
            return $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + userData.Token
                    },
                    params: data
                });
        }
        var _post = function (url, data) {
            var userData = $localStorage.authorizationData;
            return $http.post(url, data, { headers: { Authorization: 'Bearer ' + userData.Token } });
        }
        var _delete = function (url, data) {
            var userData = $localStorage.authorizationData;
            return $http.delete(url, data, { headers: { Authorization: 'Bearer ' + userData.Token } });
        }

        this.get = _get;
        this.post = _post;
        this.delete = _delete;

    }

})();