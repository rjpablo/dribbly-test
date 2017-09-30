﻿(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('gameDetailsCtrl', ['$scope', '$uibModal', '$document', 'settings',
            'httpService', 'commonServices', '$timeout', '$log', 'gameContext', '$stateParams', 'profileContext', 'teamContext', CtrlFn]);

    function CtrlFn($scope, $uibModal, $document, settings, httpService,
        commonServices, $timeout, $log, gameContext, $stateParams, profileContext, teamContext) {

        var vm = this;

        this.imageUploadPath = settings.imageUploadPath;

        vm.game = {};
        vm.gameId = $stateParams.gameId;
        vm.gameOptionsLoading = false;
        vm.userGameRelation = null;
        vm.dropDownIsOpen = false;

        if (settings.useLocalData) {
            
        } else {
            gameContext.getGameDetails(vm.gameId).then(
                function (res) {
                    $scope.game = res.data;
                }, function (err) {
                    commonServices.handleError(err);
                })
        }

        this.gameOptionsToggled = function () {
            if (vm.dropDownIsOpen) {
                vm.gameOptionsLoading = true;
                gameContext.getUserToGameRelation($scope.currentUser.UserId, vm.gameId).then(
                    function (res) {
                        vm.gameOptionsLoading = false;
                        vm.userGameRelation = res.data;
                    }, function (err) {
                        vm.gameOptionsLoading = false;
                        vm.userGameRelation = null;
                    });                
            }
            
        }

        this.cancelRequestAsTeam = function () {
            gameContext.cancelRequestToJoinAsTeam(vm.gameId, $scope.currentUser.UserId).then(
                function (res) {
                    commonServices.toast.success('Request cancelled!')
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

        this.joinAsTeam = function () {
            profileContext.getManagedTeams($scope.currentUser.UserId).then(
                function (res) {
                    teamContext.showTeamSelectorModal(res.data, 'Select a team to register').then(
                        function (selectedTeam) {
                            var creds = {
                                gameId: vm.gameId,
                                teamId: selectedTeam.teamId,
                                userId: $scope.currentUser.UserId,
                                password: ''
                            }
                            gameContext.joinGameAsTeam(creds).then(
                                function (joinResult) {
                                    commonServices.toast.success('Request sent!')
                                }, function (err) {
                                    commonServices.handleError(err)
                                })
                        })
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

    };

})();