(function () {
    'use strict';

    angular.module('mainApp')
        .service('toastService', ['toaster',toastService]);

    function toastService(toaster) {

        var timeout = 2000;

        var _settings = {
            'position-class': 'toast-top-center',
            'limit': 3,
            'time-out': timeout,
            'showCloseButton': true,
            'tapToDismiss': true
        }

        var _error = function (message, title) {
            toaster.pop({ type: 'error', title: (title || 'Error :('), body: message, showCloseButton: true, 'timeout': timeout });
        }

        var _success = function (message, title) {
            toaster.pop({ type: 'success', title: (title || 'Success!'), body: message, showCloseButton: true, 'timeout': timeout });
        }

        var _info = function (message, title) {
            toaster.pop({ type: 'info', title: (title || 'Information!'), body: message, showCloseButton: true, 'timeout': timeout });
        }

        this.settings = _settings;
        this.error = _error;
        this.success = _success;
        this.info = _info;

    }

})();