(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamMembersController', ['$scope', 'settings', 'commonServices',
            'authentication', 'teamContext', '$uibModal', '$rootScope', controllerFn]);

    function controllerFn($scope, settings, commonServices, authentication, teamContext, $uibModal, $rootScope) {

        var vm = this;

        function loadMembers(teamId) {
            teamContext.getMembers(teamId).then(
            function (res) {
                $scope.team.members = res.data
            }, function (err) {
                commonServices.handleError(err)
            })
        }        

        $scope.$watch('team.details', function (teamDetails) {
            if (teamDetails) {
                loadMembers(teamDetails.teamId);
            }
        })

        var removeListerReloadTeamMembers = $scope.$on('reload-team-members', function () {
            if ($scope.team.details) {
                loadMembers($scope.team.details.teamId);
            }
        })

        $scope.$on('$destroy', function () {
            removeListerReloadTeamMembers()
        })

        vm.addMember = function () {
            authentication.checkAuthentication('Please log in to proceed.').then(function (res) {

                var addModal = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/views/teams/shared/add-team-member-modal/add-team-member-modal-template.html',
                    controller: 'addTeamMemberCtrl',
                    resolve: {
                        'team': function () { return $scope.team.details }
                    },
                    controllerAs: 'ctrl',
                    size: 'sm',
                    windowClass: 'add-team-member-modal'
                });

                addModal.result.then(function (invitation) {
                    commonServices.toast.success('Invitation sent!')
                    $rootScope.$broadcast('reload-team-invitations');
                }, function (reason) {
                    //commonServices.toast.info('No new court was added.')
                });
            }, function () {

            })
        }

    };

})();