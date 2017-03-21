(function () {
    'user strict';

    angular.module('mainApp')
        .service('genericService',['$http', 'settings', genericService]);

    function genericService($http, settings) {
        var _get = function (url, data) {
            return $http.get(settings.apiBaseURL + url, {params:data}).then(function (response) {
                console.log('')
            }, function (err) {
                console.log('')
            })
        }
        var _post = function (url, data) {
            return $http.post(settings.apiBaseURL + url, { params: data }).then(function (response) {
                console.log('')
            }, function (err) {
                console.log('')
            })
        }
        var _delete = function (url, data) {
            return $http.delete(settings.apiBaseURL + url, { params: data }).then(function (response) {
                console.log('')
            }, function (err) {
                console.log('')
            })
        }

        this.get = _get;
        this.post = _post;
        this.delete = _delete;

    }

})();