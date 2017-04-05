(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtDetailsCtrl', ['settings', 'httpService', 'commonServices', '$stateParams', 'courtContext', courtDetailsCtrl]);

    function courtDetailsCtrl(settings, httpService, commonServices, $stateParams, courtContext) {

        var vm = this;
        this.owned = true; //whether or not the viewer owns the court being viewed
	    
		this.court = {}
		this.courtId = $stateParams.id;
		this.imageDir = settings.imageUploadPath;

		this.imageUploadPath = settings.imageUploadPath;

        var setCourtsSearched = function(courts){
            return courts;
        }

        var tempCourt = {
            id: 1,
            name: 'MGM Basketball Court',
            address: '#123 Paraiso St., Makati City, Manila',
            rate: '200',
            contactNo: '+63 932 987 7865',
            imagePath: '1.jpg',
            photos: [
                {
                    id: 1,
                    fileName: '1.jpg'
                },
                {
                    id: 2,
                    fileName: '2.jpg'
                },
                {
                    id: 3,
                    fileName: '3.jpg'
                },
                {
                    id: 4,
                    fileName: '4.jpg'
                }
            ]
        }//dummy court

        if (settings.useLocalData) {
            vm.court = tempCourt;
        } else {
            courtContext.getCourtDetails(vm.courtId).then(
            function (result) {
                vm.court = result.data
                if (vm.court) {
                    vm.setPrimaryByFileName(vm.court.imagePath);
                }
            }, function (error) {
                commonServices.handleError(error);
                vm.court = null;
            });
        }

        this.setPrimary = function (index) {
            vm.court.imagePath = vm.court.photos[index].fileName
            for (var x = 0; x < vm.court.photos.length; x++) {
                vm.court.photos[x].isPrimary = false;
            }
            vm.court.photos[index].isPrimary = true;
        }

        this.setPrimaryByFileName = function (fileName) {
            var done = false;
            for (var x = 0; (x < vm.court.photos.length && !done) ; x++) {
                if (vm.court.photos[x].fileName = fileName) {
                    vm.court.photos[x].isPrimary = (vm.court.imagePath = fileName ? true : false);
                    done = true;
                }                
            }
        }

        this.removePhoto = function (index) {
            var fileName = vm.court.photos[index].fileName;
            var isPrimary = (vm.court.photos[index].isPrimary);

            if (!isPrimary) {
                if (commonServices.confirm('Delete photo?')) {
                    courtContext.deletePhoto(fileName).then(
                        function () {
                            //commonServices.toast.info('Photo deleted')
                        }, function () {
                            commonServices.log.error('Failed to delete photo: ' + fileName);
                        }
                    );
                    vm.methods.delete(index);
                }
            } else {
                commonServices.alert('Cannot delete primary photo!');
            }
        }



    };

})();