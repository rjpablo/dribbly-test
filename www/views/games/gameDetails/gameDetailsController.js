(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gameDetailsCtrl', ['$scope', '$uibModal', '$document', 'settings',
            'httpService', 'commonServices', '$timeout', '$log', 'gameContext', '$stateParams', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings, httpService,
        commonServices, $timeout, $log, gameContext, $stateParams) {

        var vm = this;

        this.imageUploadPath = settings.imageUploadPath;

        vm.game = {};
        vm.gameId = $stateParams.gameId;

        if (settings.useLocalData) {
            
        } else {
            gameContext.getGameDetails(vm.gameId).then(
                function (res) {
                    vm.game = res.data;
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

    };

})();