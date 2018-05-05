(function () {
    'use strict';

    angular.module('mainApp').component('dblCourtphotos', {
        templateUrl: '/views/courts/court/photos/courtPhotos.html',
        controller: ['commonServices', 'gameContext', 'courtContext', '$rootScope', '$scope', 'authentication', CtrlFn],
        controllerAs: 'cph',
        bindings: {
            court: '=',
            setPrimary: '&',
            courtImgSrcPrefix: '@'
        }
    });

    function CtrlFn(commonServices, gameContext, courtContext, $rootScope, $scope, authentication,
$stateParams) {

        var vm = this;

        vm.$onInit = function () {
            var currentUser = authentication.getCurrentUser();
            if (currentUser) {
                vm.isOwned = vm.court.userId == currentUser.UserId;
            }
            
        }

        vm.removePhoto = function (index) {
            var fileName = vm.court.photos[index].fileName;
            var isPrimary = (vm.court.photos[index].isPrimary);

            if (!isPrimary) {
                commonServices.confirm('Delete photo?', function () {
                    courtContext.deletePhoto(fileName, vm.court.id).then(
                        function () {

                        }, function (err) {
                            commonServices.log.error('Failed to delete photo: ' + fileName);
                        }
                    );
                    vm.methods.delete(index);
                    $scope.$emit('DELETE_COURT_PHOTO');
                })
            } else {
                commonServices.alert('Cannot delete primary photo!');
            }
        }

        vm.uploadPhoto = function (file) {
            authentication.checkAuthentication().then(function () {
                courtContext.uploadPhoto(file, vm.court.id, authentication.currentUser.UserId).then(
                function (res) {
                    vm.court.photos.push(res.data);
                }, function (err) {
                    commonServices.handleError(err);
                })
            }, function () {

            });
            
        }

    }

})();