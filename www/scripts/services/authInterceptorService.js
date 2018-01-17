'use strict';
angular.module('mainApp')
    .factory('authInterceptorService', ['$q', '$injector', '$location', '$localStorage', function ($q, $injector, $location, $localStorage) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = $localStorage.authorizationData
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.Token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            var deferred = $q.defer();

            switch (rejection.status) {
                case 401:
                    var authService = $injector.get('authentication');
                    authService.refreshToken().then(function (response) {
                        _retryHttpRequest(rejection.config, deferred);
                    }, function () {
                        authService.clearAuthData();
                        authService.showLoginModal("You session has expired. Please log in again.")
                        deferred.reject(rejection);
                    });
                    break;
                case 403:
                    var state = $injector.get('$state');
                    state.go('courts.find');
                    break;
                default:
                    deferred.reject(rejection);
                    break;
            }

            return deferred.promise;
        }

        var _retryHttpRequest = function (config, deferred) {
            var $http = $injector.get('$http');
            $http(config).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);