(function () {
    'use strict';

    angular.module('mainApp').component('socialAuth', {
        templateUrl: '/views/account/socialAuth/socialAuth.html',
        controller: ['settings', ctrlFn],
        controllerAs: 'socialAuthCtrl',
        bindings: {
            type: '@'
        }
        });

    function ctrlFn(settings) {
        var vm = this

        vm.LoginExternal = function (provider) {
            var redirectUri = settings.siteRoot + (settings.runLocally ? '#/' : '') + 'login'
            var externalProviderUrl = settings.apiBaseURL + "Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=" + settings.clientId + "&redirect_uri=" + redirectUri;
            window.location.href = externalProviderUrl;
        }

    }
})();