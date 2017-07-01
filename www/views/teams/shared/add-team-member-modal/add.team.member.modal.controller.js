(function () {
    'use strict';
    
    angular
        .module('mainApp')
        .controller('addTeamMemberCtrl', ['$uibModalInstance', '$timeout', '$scope', 'settings', 'commonServices', 'teamContext', 'team', CtrlFn]);

    function CtrlFn($uibModalInstance, $timeout, $scope, settings, commonServices, teamContext, team) {
        var vm = this;
        vm.selectedUser;
        vm.saving = false;
        vm.invite = {};
        vm.userSearchRemoteUrl = settings.apiBaseURL + 'UserProfiles/UserViews/';

        vm.userSelected = function (user) {
            vm.selectedUser = user.originalObject;
        }

        vm.deleteSelected = function(user){
            vm.selectedUser = null;
        }

        this.ok = function (theForm) {
            if (vm.selectedUser) {
                vm.saving = true;
                vm.invite = {
                    playerId: vm.selectedUser.userId,
                    teamId: team.teamId
                }
                teamContext.invite(vm.invite).then(
                    function (res) {
                        vm.saving = false;
                        $uibModalInstance.close(res.data);
                    }, function (err) {
                        vm.saving = false;
                        commonServices.handleError(err);
                    }
                );
            } else {

            }
        };

        this.cancel = function (e) {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();