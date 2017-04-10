(function () {
    'user strict';

    angular.module('mainApp')
    .run(runFn);

    function runFn($rootScope, $state, $stateParams) {
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, next, toParams, from, fromParams, error) {
            var stateName = next.name;            

        });

        var stateChangeErrorListener = $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
            
        });

        $rootScope.$on('$destroy', function () {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
            stateChangeErrorListener();
        });

    }

})();