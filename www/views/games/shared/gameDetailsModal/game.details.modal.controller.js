(function () {
    'use strict';

    angular.module('mainApp').component('gameDetailsModal', {
        templateUrl: '/views/games/shared/gameDetailsModal/game-details-modal-template.html',
        controller: ['commonServices', 'gameContext', 'courtContext', '$rootScope', '$scope', CtrlFn],
        controllerAs: 'gdm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });
    
    function CtrlFn(commonServices, gameContext, courtContext, $rootScope, $scope) {

        var $ctrl = this;
        
        $ctrl.$onInit = function () {
            $ctrl.game = $ctrl.resolve.modalData.game;
            $ctrl.courtSelected = $ctrl.resolve.modalData.game.court;
            if (!$ctrl.resolve.modalData.isAdd) {
                //TODO: validate game details and throw an error if validation fails
                $ctrl.mode = 'edit'
            } else {
                $ctrl.mode = 'add'
                $ctrl.game.allowedToJoinTeamA = 0;
                $ctrl.game.allowedToJoinTeamB = 0;
            }
        }

        $ctrl.saving = false;
        $ctrl.courtSearchRemoteUrl = courtContext.courtSearchRemoteUrl;
        $ctrl.validation = {};

        $ctrl.ok = function (theForm) {
            theForm.name.$touched = true;
            if (validateGame($ctrl.game) && theForm.$valid) {
                $ctrl.saving = true;
                $ctrl.game.dateCreated = new Date();
                $ctrl.game.creatorId = currentUser.UserId;
                $ctrl.game.isProtected = ($ctrl.game.password ? ($ctrl.game.password.trim().length > 0 ? true : false) : false)
                $ctrl.game.court = null;

                gameContext.create($ctrl.game).then(
                    function (res) {
                        $ctrl.saving = false;
                        commonServices.redirectToUrl('gameDetails/players/' + res.data.gameId);
                        $ctrl.modalInstance.close(res.data);
                    }, function (err) {
                        commonServices.handleError(err);
                        $ctrl.saving = false;
                    }
                );
            } else {
                commonServices.toast.error('Please fix errors.')
            }
            
        };

        function validateGame(game) {

            var isValid = true;
            $ctrl.validation = {
                schedule: {},
                court: {}
            };

            if (game.schedule == null) {
                $ctrl.validation.schedule.required = true;
                $ctrl.validation.schedule.$invalid = true;
                isValid = false;
            }

            if (!$ctrl.validation.missingSchedule && (game.schedule < new Date())) {
                $ctrl.validation.schedule.invalid = true;
                $ctrl.validation.schedule.$invalid = true;
                isValid = false;
            }

            if (!game.courtId) {
                $ctrl.validation.court.required = true;
                $ctrl.validation.court.$invalid = true;
                isValid = false;
            }

            return isValid;

        }

        $ctrl.cancel = function (e) {
            $ctrl.modalInstance.dismiss('cancel');
        };

        //Executed when user selects the schedule
        $ctrl.schedSelected = function (newDate, oldDate) {

        }

        function setCourt(court) {
            if (court) {
                $ctrl.game.courtId = court.id
            } else {
                $ctrl.game.courtId = null;
            }            
            $ctrl.game.court = court;
        }

        $scope.courtSelected = function (value) {
            if (value) {
                setCourt(value.originalObject);
            } else {
                setCourt(null);
            }
        }

        $ctrl.removeCourt = function (court) {
            $rootScope.$broadcast('angucomplete-alt:clearInput');
        }

    }

})();