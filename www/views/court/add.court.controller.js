(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('addCourtCtrl', ['$uibModalInstance', 'Upload', '$timeout', '$scope', '$http', 'fileService', addCourtCtrl]);

    function addCourtCtrl($uibModalInstance, Upload, $timeout, $scope, $http, fileService) {

        var uploadPath = 'http://localhost:52964/api/file/Upload';
        var imagesFolderPath = 'images/uploads/courts/'

        this.galleryPhotos = [];
        this.galleryMethods = {};
        this.progress;
        this.court = {};

        var __this = this;

        this.removePhoto = function (index) {
            //if (confirm('Remove Photo?')) {
                fileService.deleteCourtPhoto(__this.galleryPhotos[index].fileName);
                __this.methods.delete(index);
            //}
        }

        this.uploadPic = function (file) {
            return fileService.uploadCourtPhoto(file);
        }

        this.addPhotos = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var fileName;

                    __this.uploadPic(files[i]).then(function (response) {
                        fileName = response.data;
                        __this.galleryPhotos.push({ url: imagesFolderPath + fileName, fileName: fileName });
                    }, function (response) {
                        if (response.status > 0)
                            __this.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        __this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });;
                }
            }
        }

        $scope.$on('modal.closing', function (event, reason, submitting) {
            if (!submitting) {
                if (confirm('Cancel Registration?')) {
                    __this.galleryPhotos.forEach(function (photo) {
                        fileService.deleteCourtPhoto(photo.fileName);
                    })
                } else {
                    event.preventDefault();
                }
            }
        });


        this.ok = function (e) {
            __this.court.imagePath = this.galleryPhotos[0].url;
            $uibModalInstance.close(__this.court);
        };

        this.cancel = function (e) {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();