(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('gameDetailsModalCtrl', ['$uibModalInstance', 'Upload', '$timeout', '$scope', 'fileService', 'settings', 'commonServices', 'gameContext', 'gameDetails', 'currentUser', 'courtContext', '$rootScope', CtrlFn]);

    function CtrlFn($uibModalInstance, Upload, $timeout, $scope, fileService, settings, commonServices, gameContext, gameDetails, currentUser, courtContext, $rootScope) {

        var vm = this;
        this.game = gameDetails;
        vm.saving = false;
        vm.courtSearchRemoteUrl = courtContext.courtSearchRemoteUrl;
        vm.validation = {};

        vm.ok = function (theForm) {
            theForm.name.$touched = true;
            if (validateGame(vm.game) && theForm.$valid) {
                vm.saving = true;
                vm.game.dateCreated = new Date();
                vm.game.creatorId = currentUser.UserId;
                vm.game.isProtected = (vm.game.password ? (vm.game.password.trim().length > 0 ? true : false) : false)
                vm.game.court = null;

                gameContext.create(vm.game).then(
                    function (res) {
                        vm.saving = false;
                        commonServices.redirectToUrl('gameDetails/players/' + res.data.gameId);
                        $uibModalInstance.close(res.data);
                    }, function (err) {
                        commonServices.handleError(err);
                        vm.saving = false;
                    }
                );
            } else {
                commonServices.toast.error('Please fix errors.')
            }
            
        };

        function validateGame(game) {

            var isValid = true;
            vm.validation = {
                schedule: {},
                court: {}
            };

            if (game.schedule == null) {
                vm.validation.schedule.required = true;
                vm.validation.schedule.$invalid = true;
                isValid = false;
            }

            if (!vm.validation.missingSchedule && (game.schedule < new Date())) {
                vm.validation.schedule.invalid = true;
                vm.validation.schedule.$invalid = true;
                isValid = false;
            }

            if (!game.courtId) {
                vm.validation.court.required = true;
                vm.validation.court.$invalid = true;
                isValid = false;
            }

            return isValid;

        }

        vm.cancel = function (e) {
            $uibModalInstance.dismiss('cancel');
        };

        //Executed when user selects the schedule
        vm.schedSelected = function (newDate, oldDate) {

        }

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
            $rootScope.$broadcast('angucomplete-alt:clearInput');
        }

    }

})();