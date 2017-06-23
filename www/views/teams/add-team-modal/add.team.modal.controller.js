(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('addTeamCtrl', ['$uibModalInstance', 'Upload', '$timeout', '$scope', 'fileService', 'settings', 'commonServices', 'teamContext', 'currentUser', CtrlFn]);

    function CtrlFn($uibModalInstance, Upload, $timeout, $scope, fileService, settings, commonServices, teamContext, currentUser) {

        this.galleryPhotos = [];
        this.galleryMethods = {};
        this.progress;
        this.imageUploadPath = settings.fileUploadBasePath + currentUser.UserId + '/teamPhotos/';
        this.map = {};
        this.team = {
            
        };

        this.saving = false;

        this.maxNumOfPhotos = 5;
        this.progress = 0;
        this.uploadingFiles = [] //the files to be uploaded
        this.uploading = false; //whether or not an upload is in progress
        this.uploadIndex = 0; //The index of file (in the array of files to be uploaded) that's currently being updated
        this.showUploadDetails = false;

        var __this = this;

        this.ok = function (theForm) {
            theForm.name.$touched = true;
            if (theForm.$valid) {
                __this.saving = true;
                __this.team.dateCreated = new Date();
                __this.team.creatorId = currentUser.UserId;
                __this.team.managerId = currentUser.UserId;

                teamContext.register(__this.team).then(
                    function (res) {
                        __this.saving = false;
                        $uibModalInstance.close(res);
                    }, function (err) {
                        commonServices.handleError(err);
                        __this.saving = false;
                    }
                );
            } else {

            }
            
        };

        this.cancel = function (e) {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();