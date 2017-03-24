(function () {
    'user strict';

    angular.module('mainApp')
        .service('commonServices', ['toastService','$log', commonServices]);

    function commonServices(toastService, $log) {

        var _handleError = function (error) {
            switch (error.status) {
                case 400: //bad request
                    toastService.error(error.data.Message);
                    $log.error(error.data.Message)
                    break;
                case 401: //unauthorized
                    toastService.error('Access denied.');
                    $log.error(error.data.Message);
                    break;
                case 500: //internal server error
                    toastService.error('An internal error occured. Please try again.');
                    $log.error(
                        'Exception Message: ' + error.data.ExceptionMessage + '\n' +
                        'StackTrace: ' + error.data.StackTrace
                        )
                    break;
                case -1: //Unable to connect to server
                    toastService.error('Couldn\'t connect to the server. Please try again later.');
                    break;
                default: //unknown error
                    toastService.error('An unknown error occured.');
                    $log.error('An unknown error occured.')
            }
        }

        this.toast = toastService;
        this.handleError = _handleError;
        this.log = $log;

    }

})();