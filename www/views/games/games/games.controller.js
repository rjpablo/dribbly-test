(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gamesCtrl', ['$scope', '$uibModal', '$document', 'settings',
            'httpService', 'commonServices', '$timeout', '$log', 'gameContext', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings, httpService,
        commonServices, $timeout, $log, gameContext) {

        var vm = this;

        this.imageUploadPath = settings.imageUploadPath;

        vm.games = [];

        if (settings.useLocalData) {
            vm.games = gameContext.getTestGames();
        } else {

        }

    };

})();