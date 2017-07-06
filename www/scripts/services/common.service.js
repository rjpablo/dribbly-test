(function () {
    'use strict';

    angular.module('mainApp')
        .service('commonServices', ['toastService','$log', '$ngConfirm', commonServices]);

    function commonServices(toastService, $log, $ngConfirm) {

        var _handleError = function (error) {
            switch (error.status) {
                case 400: //bad request
                    toastService.error(error.data.message);
                    $log.error(error.data.Message)
                    break;
                case 401: //unauthorized
                    toastService.error('Access denied.');
                    $log.error(error.data.Message);
                    break;
                case 500: //internal server error
                    if (error.data) {
                        if (error.data.userMessage) {
                            toastService.error('error.data.userMessage');
                        } else {
                            toastService.error('An internal error occured. Please try again.');
                        }

                        $log.error(
                        'Exception Message: ' + error.data.ExceptionMessage + '\n' +
                        'StackTrace: ' + error.data.StackTrace
                        )

                    } else {
                        toastService.error('An internal error occured. Please try again.');
                    }                   
                    
                    break;
                case -1: //Unable to connect to server
                    toastService.error('An unexpected error occured.');
                    $log.error('Could not send request.')
                    break;
                default: //unknown error
                    toastService.error('An unknown error occured.');
                    $log.error('An unknown error occured.')
            }
        }

        function _alert(message, title) {
            $ngConfirm(message, title);
        }

        function _confirm(message, okCallback, title) {
            $ngConfirm({
                content: message,
                title: title,
                backgroundDismiss: true,
                buttons: {
                    Ok: okCallback,
                    Cancel: {}
                },
            })
        }

        this.toast = toastService;
        this.handleError = _handleError;
        this.log = $log;
        this.alert = _alert;
        this.confirm = _confirm;

    }

})();