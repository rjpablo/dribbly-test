(function () {
    'use strict';

    angular.module('mainApp').directive('teamMember', ['settings', 'teamContext', 'commonServices', '$rootScope', '$ngConfirm',directiveFn]);

    function directiveFn(settings, teamContext, commonServices, $rootScope, $ngConfirm) {
        return {
            restrict: 'E',
            scope: {
                'player': '=',
                'removeFunction': '&?',
                'type': '='
            },
            replace: true,
            templateUrl: '/scripts/directives/teamMember/team-member-directive-template.html',
            link: function (scope, element, attrs) {
                
                function setPicUrl(player) {
                    if (scope.player) {
                        if (player.profilePic) {
                            scope.profilePicUrl = settings.fileUploadBasePath + player.playerId + '/photos/' + player.profilePic
                        } else {
                            scope.profilePicUrl = settings.defaultProfilePicUrl;
                        }
                    }
                }

                scope.$watch('player', function (player) {
                    setPicUrl(player);
                })

                scope.dismissPlayer = function (player) {
                    commonServices.confirm('Dismiss <b>' + player.userName + '</b> from this team?',
                            function () {
                                teamContext.dismissPlayer(player.playerId, player.teamId).then(
                                    function (res) {
                                        $rootScope.$broadcast('reload-team-members');
                                    }, function (err) {
                                        commonServices.handleError(err);
                                    })
                            }, 'Dismiss Player')
                }

                scope.reinvite = function (player) {
                    teamContext.invitePlayer(player.playerId, player.teamId).then(
                        function (res) {
                            commonServices.toast.success('Invitation sent!');
                            $rootScope.$broadcast('reload-team-invitations');
                        }, function (err) {
                            commonServices.handleError(err);
                        })
                }

                scope.respondToRequestCheck = function (request, approve) {
                    if (approve) {
                        commonServices.confirm('Allow <b>' + request.userName + '</b> to be a member of this team?',
                            function () {
                                scope.respondToRequest(request, approve);
                            }, null, function () { return })
                    } else {
                        scope.respondToRequest(request, approve);
                    }
                }

                scope.respondToRequest = function (request, approve) {
                    teamContext.respondToRequest(request.teamId, request.playerId, approve).then(
                            function (res) {
                                $rootScope.$broadcast('update-team-requests');
                            }, function (err) {
                                commonServices.handleError(err);
                            })
                }
                scope.cancelInvitation = function (invitation) {
                    teamContext.cancelInvitation(invitation.teamId, invitation.playerId).then(
                        function (res) {
                            $rootScope.$broadcast('reload-team-invitations');
                        }, function (err) {
                            commonServices.handleError(err);
                        })
                }
            }
        }
    }
})();