(function () {
    'user strict';

    angular.module('mainApp')
        .service('fileService', ['settings','genericService', 'Upload',fileService]);

    function fileService(settings, genericService, Upload) {

        var uploadCourtPhotoUrl = settings.apiBaseURL + 'file/upload';
        var deleteCourtPhotoUrl = settings.apiBaseURL + 'file/delete';
        var maxSizeKB = 2000000;

        this.uploadCourtPhoto = function (file) {
            return Upload.upload({
                url: uploadCourtPhotoUrl,
                data: { file: file },
            });
        }

        this.deleteCourtPhoto = function (fileName) {
            return genericService.delete(deleteCourtPhotoUrl, { filename: fileName })
        }

        this.validateFiles = function (file) {
            return new Promise(function (resolve, reject) {
                var errors = [];

                if (file.size > maxSizeKB) {
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

            if (file.size > maxSizeKB) {
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