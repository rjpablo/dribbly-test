(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('addCourtCtrl', ['$uibModalInstance', 'Upload', '$timeout', '$scope', '$http', 'fileService', 'settings', 'commonServices','genericService', addCourtCtrl]);

    function addCourtCtrl($uibModalInstance, Upload, $timeout, $scope, $http, fileService, settings, commonServices, genericService) {

        this.galleryPhotos = [];
        this.galleryMethods = {};
        this.progress;
        this.imageUploadPath = settings.imageUploadPath;
        this.map = {};
        this.court = {
            rate: 0
        };

        this.maxNumOfPhotos = 5;

        var __this = this;

        this.setPrimary = function (index) {
            __this.court.imagePath = __this.galleryPhotos[index].fileName
            for (var x = 0; x < __this.galleryPhotos.length; x++) {
                __this.galleryPhotos[x].isPrimary = false;
            }
            __this.galleryPhotos[index].isPrimary = true;
        }

        this.removePhoto = function (index) {
            var fileName = __this.galleryPhotos[index].fileName;
            
            if (fileName != __this.court.imagePath) {
                //if (confirm('Remove Photo?')) {
                deleteCourtPhoto(fileName, index);                    
                //}
            } else {
                if (confirm('Delete primary photo?')) {
                    deleteCourtPhoto(fileName, index);
                    __this.court.imagePath = ""
                }
            }            
        }

        function deleteCourtPhoto(fileName, index) {
            fileService.deleteCourtPhoto(fileName).then(
                function () {
                    //commonServices.toast.info('Photo deleted')
                }, function () {
                    commonServices.log.error('Failed to delete photo: ' + fileName);
                }
            );

            __this.methods.delete(index);

        }

        this.deleteAllPhotos = function () {
            if(__this.galleryPhotos.length > 0) {
                fileService.deleteCourtPhoto(__this.galleryPhotos[0].fileName).then(function () {
                    __this.methods.delete(0);
                    __this.deleteAllPhotos();
                }, function () {
                    commonServices.log.error('Failed to delete photo: ' + __this.galleryPhotos[0].fileName);
                });
            }
        }

        this.uploadPic = function (file) {
            return fileService.uploadCourtPhoto(file);
        }

        this.addPhotos = function (files) {

            if (__this.galleryPhotos.length + files.length <= __this.maxNumOfPhotos) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        fileService.validateFile(files[i], function (result) {
                            var fileName;

                            __this.uploadPic(files[i]).then(function (response) {
                                fileName = response.data;
                                __this.galleryPhotos.push({ url: settings.imageUploadPath + fileName, fileName: fileName });
                            }, function (response) {
                                commonServices.toast.error('Upload failed.')
                                __this.errorMsg = response.status + ': ' + response.data;
                            }, function (evt) {
                                // Math.min is to fix IE which reports 200% sometimes
                                __this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                            });;
                        }, function (errors) {
                            commonServices.toast.error(errors.join('\n'));
                        });
                    }
                }
            } else {
                //TODO: Make this an alert instead of a toast
                commonServices.toast.error('Sorry, you may only upload up to a maximum of ' + __this.maxNumOfPhotos + ' photos.')
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

        this.updateLocation = function (loc) {
            this.court.address = loc.formatted_address;
            this.court.location = loc;
            this.court.latitude = loc.geometry.location.lat;
            this.court.longitude = loc.geometry.location.lng;
        }


        this.ok = function (e) {
            if (__this.court.imagePath) {
                //__this.court.imagePath = this.galleryPhotos[0].fileName;
                __this.court.dateRegistered = new Date();

                genericService.post(settings.apiBaseURL + 'court/register/', __this.court).then(
                    function (res) {
                        $uibModalInstance.close(__this.court);
                    }, function (err) {
                        commonServices.handleError(err);
                    }
                );
            } else {
                commonServices.toast.error('Please select a primary photo.')
            }
        };

        this.cancel = function (e) {
            __this.deleteAllPhotos();
            $uibModalInstance.dismiss('cancel');
        };

    }

})();