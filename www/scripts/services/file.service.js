﻿(function () {
    'user strict';

    angular.module('mainApp')
        .service('fileService', ['settings', 'httpService', 'Upload', fileService]);

    function fileService(settings, httpService, Upload) {

        var uploadCourtPhotoUrl = settings.apiBaseURL + 'file/UploadCourtPhoto/';
        var deleteCourtPhotoUrl = settings.apiBaseURL + 'file/deleteCourtPhoto/';
        var uploadProfilePhotoUrl = settings.apiBaseURL + 'file/UploadProfilePic/';
        var maxSizeKB = 2000000; //1M = 1G, 0 = no limit

        this.uploadCourtPhoto = function (file, userId) {
            return Upload.upload({
                url: uploadCourtPhotoUrl + userId,
                file: file
            });
        }

        this.uploadProfilePhoto = function (file, userId) {
            return Upload.upload({
                url: uploadProfilePhotoUrl + userId,
                file: file
            });
        }

        this.deleteCourtPhoto = function (fileName, userId) {
            return httpService.delete(deleteCourtPhotoUrl + fileName + '/' + userId)
        }

        this.validateFiles = function (file) {
            return new Promise(function (resolve, reject) {
                var errors = [];

                if (maxSizeKB > 0 && file.size > maxSizeKB) {
                    errors.push('\'' + file.name + '\' exceeds the maximum file size for photos.')
                }

                if (errors.length == 0) {
                    resolve('Upload succeeded!');
                } else {
                    reject(errors);
                }
            });

        }

        this.validateFile = function (file, valid, invalid) {
            var errors = [];

            if (maxSizeKB > 0 && file.size > maxSizeKB) {
                errors.push('\'' + file.name + '\' exceeds the maximum file size for photos.')
            }

            if (errors.length == 0) {
                valid('Upload succeeded!');
            } else {
                invalid(errors);
            }
        }

        return this;

    }

})();