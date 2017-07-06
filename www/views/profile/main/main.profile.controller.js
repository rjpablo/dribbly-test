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
                markPrimaryPhoto($scope.profile.details.profilePicId)
            },
            function(err){
                commonServices.handleError(err);
            }
        )

        this.removePhoto = function (index) {
            var fileName = vm.mainProfile.photos[index].fileName;
            var isPrimary = (vm.mainProfile.photos[index].isPrimary);

            if (!isPrimary) {
                //if (commonServices.confirm('Delete photo?')) {
                //    profileContext.deletePhoto(fileName, vm.mainProfile.userId).then(
                //        function () {
                //            //commonServices.toast.info('Photo deleted')
                //        }, function () {
                //            commonServices.log.error('Failed to delete photo: ' + fileName);
                //        }
                //    );
                //    vm.methods.delete(index);
                //}
                commonServices.confirm('Delete photo?', function () {
                    profileContext.deletePhoto(fileName, vm.mainProfile.userId).then(
                        function () {
                            //commonServices.toast.info('Photo deleted')
                        }, function () {
                            commonServices.log.error('Failed to delete photo: ' + fileName);
                        }
                    );
                    vm.methods.delete(index);
                })
            } else {
                commonServices.alert('Cannot delete primary photo!');
            }
        }

        this.setPhotoAsPrimary = function (index) {
            var photo = vm.mainProfile.photos[index]
            profileContext.updateProfilePic($scope.profile.details.userId, photo.id).then(
                function (res) {
                    $scope.updateProfilePicArray(photo.fileName)
                    $scope.profile.details.profilePicId = photo.id
                    $scope.profile.details.profilePic = photo
                    markPrimaryPhoto(photo.id)
                }, function(err){
                    commonServices.handleError(err);
                })            
        }

        var markPrimaryPhoto = function (photoId) {
            for (var x = 0; (x < vm.mainProfile.photos.length) ; x++) {
                vm.mainProfile.photos[x].isPrimary = (vm.mainProfile.photos[x].id == photoId);
            }
        }

        $scope.$on('primary-photo-uploaded',function(evt, photo){
            vm.mainProfile.photos.push(photo);
            markPrimaryPhoto(photo.id);
        })

        this.uploadPhoto = function (file) {
            profileContext.uploadPhoto(file, $scope.profile.details.userId).then(
                function(res){
                    vm.mainProfile.photos.push(res.data);
                },function(err){
                    commonServices.handleError(err);
                })
        }

    };

})();