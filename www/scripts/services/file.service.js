(function () {
    'user strict';

    angular.module('mainApp')
        .service('fileService', ['settings','genericService', 'Upload',fileService]);

    function fileService(settings, genericService, Upload) {

        var uploadCourtPhotoUrl = settings.apiBaseURL + 'file/upload';
        var deleteCourtPhotoUrl = settings.apiBaseURL + 'file/delete';

        this.uploadCourtPhoto = function (file) {
            return Upload.upload({
                url: uploadCourtPhotoUrl,
                data: { file: file },
            });
        }

        this.deleteCourtPhoto = function (fileName) {
            return genericService.delete(deleteCourtPhotoUrl, { filename: fileName }).then(
                function () {
                    console.log('')
                }, function () {
                    console.log('')
                });
        }

        return this;

    }

})();