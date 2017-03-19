(function () {
    'use strict';

    angular
        .module('mainApp')
        .service('fileService', ['Upload', '$http', function (Upload, $http) {

            var uploadUrl = 'http://localhost:52964/api/file/Upload';
            var deleteUrl = 'http://localhost:52964/api/file/delete';

            this.uploadCourtPhoto = function (file) {
                return Upload.upload({
                    url: uploadUrl,
                    data: {file: file },
                });
            }

            this.deleteCourtPhoto = function (fileName) {
                return $http.delete(deleteUrl, { params: { filename: fileName } });
            }

            //For uploading multiple files
            //this.addPhotos = function (files) {
            //    if (files && files.length) {
            //        for (var i = 0; i < files.length; i++) {
            //            var fileName;

            //            __this.uploadPic(files[i]).then(function (response) {
            //                fileName = response.data;
            //                __this.galleryPhotos.push({ url: imagesFolderPath + fileName, fileName: fileName });
            //            }, function (response) {
            //                if (response.status > 0)
            //                    __this.errorMsg = response.status + ': ' + response.data;
            //            }, function (evt) {
            //                // Math.min is to fix IE which reports 200% sometimes
            //                __this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            //            });;
            //        }
            //    }
            //}

        }]);
})();