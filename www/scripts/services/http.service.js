(function () {
    'user strict';

    angular.module('mainApp')
        .service('httpService', ['$http', genericService]);

    function genericService($http) {
        var _get = function (url, data) {
            return $http.get(url, { params: data });
        }
        var _post = function (url, data) {
            return $http.post(url, data);
        }
        var _delete = function (url, data) {
            return $http.delete(url, { params: data });
        }

        this.get = _get;
        this.post = _post;
        this.delete = _delete;

    }

})();