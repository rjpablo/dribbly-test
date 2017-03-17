(function () {
    'use strict';

    angular
        .module('mainApp')
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl){
                var fd = new FormData();
                fd.append('file', file);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', uploadUrl, true);
                xhr.send(fd);


                //$.ajax({
                //    url: 'Your url here',
                //    data: fd,
                //    type: 'POST',
                //    // THIS MUST BE DONE FOR FILE UPLOADING
                //    contentType: false,
                //    processData: false
                //});
            }
        }])
        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);

})();