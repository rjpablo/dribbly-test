(function () {
    'use strict';

    angular.module('mainApp')
        .service('commonServices', ['toastService','$log', '$ngConfirm', '$location', commonServices]);

    function commonServices(toastService, $log, $ngConfirm, $location) {

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
                        if (error.data.exceptionMessage) {
                            toastService.error(error.data.exceptionMessage);
                        } else {
                            toastService.error('An internal error occured. Please try again.');
                        }

                        $log.error(
                        'Exception Message: ' + error.data.innerException.exceptionMessage + '\n' +
                        'StackTrace: ' + error.data.innerException.stackTrace
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

        function _confirm(message, okCallback, title, cancelCallback) {
            $ngConfirm({
                content: message,
                title: title,
                backgroundDismiss: true,
                buttons: {
                    Ok: okCallback || function () { },
                    Cancel: cancelCallback || function(){}
                },
            })
        }

        function _prompt(prompt, title) {
            return window.prompt(prompt);
        }

        var _redirectToUrl = function (url) {
            $location.path(url);
        }

        var _setPageTitle = function (title) {
            window.document.title = title + ' - Dribbly';
        }

        function _parseQueryString(queryString) {
            var data = {},
                pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }

        this.toast = toastService;
        this.handleError = _handleError;
        this.log = $log;
        this.alert = _alert;
        this.confirm = _confirm;
        this.prompt = _prompt;
        this.redirectToUrl = _redirectToUrl;
        this.parseQueryString = _parseQueryString;
        this.setPageTitle = _setPageTitle

    }

})();