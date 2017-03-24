(function () {
    'user strict';

    angular.module('mainApp')
        .service('toastService', ['toaster',toastService]);

    function toastService(toaster) {

        var _settings = {
            'position-class': 'toast-top-center',
            'limit': 3,
            'time-out': 3000
        }

        var _error = function (message, title) {
            toaster.pop('error', title || 'Error!', message);
        }

        var _success = function (message, title) {
            toaster.pop('success', title || 'Success!', message);
        }

        var _info = function (message, title) {
            toaster.pop('info', title || 'Information!', message);
        }

        this.settings = _settings;
        this.error = _error;
        this.success = _success;
        this.info = _info;

    }

})();