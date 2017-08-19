(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('gameDetailsModalCtrl', ['$uibModalInstance', 'Upload', '$timeout', '$scope', 'fileService', 'settings', 'commonServices', 'gameContext','gameDetails', 'currentUser', 'courtContext', CtrlFn]);

    function CtrlFn($uibModalInstance, Upload, $timeout, $scope, fileService, settings, commonServices, gameContext, gameDetails, currentUser, courtContext) {

        var vm = this;
        this.game = gameDetails;
        vm.saving = false;
        vm.courtSearchRemoteUrl = courtContext.courtSearchRemoteUrl;

        vm.ok = function (theForm) {
            theForm.name.$touched = true;
            if (theForm.$valid) {
                vm.saving = true;
                vm.game.dateCreated = new Date();
                vm.game.creatorId = currentUser.UserId;
                vm.game.isProtected = (vm.game.password?(vm.game.password.trim().length > 0?true:false):false)

                gameContext.create(vm.game).then(
                    function (res) {
                        vm.saving = false;
                        $uibModalInstance.close(res.data);
                    }, function (err) {
                        commonServices.handleError(err);
                        vm.saving = false;
                    }
                );
            } else {

            }
            
        };

        vm.cancel = function (e) {
            $uibModalInstance.dismiss('cancel');
        };

        function setCourt(court) {
            if (court) {
                vm.game.courtId = court.id
            } else {
                vm.game.courtId = null;
            }            
            vm.game.court = court;
        }

        vm.courtSelected = function (value) {
            if (value) {
                setCourt(value.originalObject);
            } else {
                setCourt(null);
            }
        }

        vm.removeCourt = function (court) {
            setCourt(null);
        }

    }

})();