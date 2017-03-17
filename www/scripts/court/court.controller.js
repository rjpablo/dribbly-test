(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope','$uibModal', '$document', '$http', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, $http) {

		var vm = this;
	
        this.courtsSearched = {};

        //function createCORSRequest(method, url) {
        //    var xhr = new XMLHttpRequest();
        //    if ("withCredentials" in xhr) {
        //        // XHR for Chrome/Firefox/Opera/Safari.
        //        xhr.open(method, url, true);
        //    } else if (typeof XDomainRequest != "undefined") {
        //        // XDomainRequest for IE.
        //        xhr = new XDomainRequest();
        //        xhr.open(method, url);
        //    } else {
        //        // CORS not supported.
        //        xhr = null;
        //    }
        //    return xhr;
        //}

        var setCourtsSearched = function(courts){
            return courts;
        }

        /* var getCourts = $.ajax({
            url: 'http://localhost:52964/api/Court/GetCourts',
            type: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://example.org'
            }
        });

        getCourts.done(function (result) {
            vm.courtsSearched = result
            $scope.$apply();
        });

        getCourts.fail(function (result) {
            vm.courtsSearched = result
        }); */

        //function (callback) {

            

        //    //$http.post('http://localhost:52964/api/Court/GetCourts').then(
        //    //    function (res) {
        //    //        alert('Success: ' + res.data);
        //    //        return res.data;
        //    //    }
        //    //    , function (res) {
        //    //        alert('Error: ' + res.responseText);
        //    //        return res.data;
        //    //    });

        //    //var result = {};

        //    //var xhr = createCORSRequest('GET', 'http://localhost:52964/api/Court/GetCourts');
        //    //if (!xhr) {
        //    //    alert('CORS not supported');
        //    //    return;
        //    //}

        //    //// Response handlers.
        //    //xhr.onload = function () {
        //    //    __this.courtsSearched = JSON.parse(xhr.response);
        //    //};

        //    //xhr.onerror = function () {
        //    //    alert('Failed to fetch courts =(');
        //    //    __this.courtsSearched = {};
        //    //};

        //    //xhr.send();

            
        //}

        this.tempCourts = [
            {
                id: 1,
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/1.jpg'
            },
            {
                id: 2,
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/2.jpg'
            },
            {
                id: 3,
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/3.jpg'
            },
            {
                id: 4,
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/4.jpg'
            },
            {
                id: 5,
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/5.jpg'
            },
            {
                id: 6,
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/2.jpg'
            }
        ];//Sample Courts
		

        this.courtsSearched = this.tempCourts;

        //getCourts(setCourtsSearched);

        vm.animationsEnabled = true;

        vm.openAddModal = function (size, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector(parentSelector)) : undefined;
            var addCourtModal = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/www/views/court/add-modal-template.html',
                controller: 'addCourtCtrl',
                controllerAs: 'addCourtCtrl',
                size: size,
                appendTo: parentElem
                //resolve: {
                //    items: function () {
                //        return this.items;
                //    }
                //}
            });

            addCourtModal.result.then(function (court) {
                vm.addCourt(court);
            }, function (reason) {
                console.log('Reason for closing: ' + reason);
            });
        };

        this.addCourt = function (court) {
            vm.courtsSearched.push(court);
        }

    };

    angular
        .module('mainApp')
        .controller('addCourtCtrl', ['$uibModalInstance', 'Upload', '$timeout', 'fileUpload', '$scope', addCourtCtrl]);

    function addCourtCtrl($uibModalInstance, Upload, $timeout, fileUpload, $scope) {

        var uploadPath = 'http://localhost:52964/api/fileUpload/Upload';

        var __this = this;

        this.picFile = {}

        this.uploadFile = function () {
            var file = this.picFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = "/www/images/uploads/courts";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };

        __this.username = 'RJ';

        this.uploadPic = function (file) {
            file.upload = Upload.upload({
                url: uploadPath,
                data: { username: __this.username, file: file },
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    __this.court.imagePath = 'images/uploads/courts/' + file.name;
                    console.log('Uploaded image: ' + response.data)
                    $scope.$apply();
                });
            }, function (response) {
                if (response.status > 0)
                    __this.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log(file.progress)
            });
        }

        //this.uploadFiles = function (files, errFiles) {
        //    this.files = files;
        //    this.errFiles = errFiles;
        //    angular.forEach(files, function (file) {
        //        file.upload = Upload.upload({
        //            url: '/',
        //            data: { file: file }
        //        });

        //        file.upload.then(function (response) {
        //            $timeout(function () {
        //                file.result = response.data;
        //            });
        //        }, function (response) {
        //            if (response.status > 0)
        //                __this.errorMsg = response.status + ': ' + response.data;
        //        }, function (evt) {
        //            file.progress = Math.min(100, parseInt(100.0 *
        //                                     evt.loaded / evt.total));
        //        });
        //    });
        //}

        this.court = {};


        this.ok = function () {
            $uibModalInstance.close(__this.court);
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();