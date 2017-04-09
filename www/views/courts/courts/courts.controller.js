(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtsCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'courtContext', '$log', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, courtContext, $log) {

        $scope.setActiveNavIndex(0);

        var vm = this;

        this.activeTabIndex = 0;
		this.imageUploadPath = settings.imageUploadPath;

        $scope.setActiveTab = function (index) {
            vm.activeTabIndex = index;
        }

    };

})();