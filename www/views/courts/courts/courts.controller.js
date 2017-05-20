(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtsCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'courtContext', '$log', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, courtContext, $log) {

        var vm = this;

        this.imageUploadPath = settings.imageUploadPath;
        this.courtImgSrcPrefix = settings.fileUploadBasePath;

    };

})();