(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('mainProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', 'profileContext', 'fileService', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, profileContext, fileService) {

        var vm = this;
        vm.mainProfile = {}
        vm.photosUrlPrefix = settings.fileUploadBasePath + $scope.profile.details.userId + '/photos/';
        
        profileContext.getMainProfile($scope.profile.details.userId).then(
            function (res) {
                vm.mainProfile = res.data
                setPrimaryPhoto($scope.profile.details.profilePic)
            },
            function(err){
                commonServices.handleError(err);
            }
        )

        this.removePhoto = function (index) {
            var fileName = vm.mainProfile.photos[index].fileName;
            var isPrimary = (vm.mainProfile.photos[index].isPrimary);

            if (!isPrimary) {
                if (commonServices.confirm('Delete photo?')) {
                    profileContext.deletePhoto(fileName, vm.mainProfile.userId).then(
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

        var setPrimaryPhoto = function (fileName) {
            var done = false;
            for (var x = 0; (x < vm.mainProfile.photos.length && !done) ; x++) {
                if (vm.mainProfile.photos[x].fileName == fileName) {
                    vm.mainProfile.photos[x].isPrimary = (vm.mainProfile.imagePath == fileName ? true : false);
                    done = true;
                }
            }
        }

    };

})();