(function () {
    'use strict';

    angular.module('mainApp').directive('teamMember', ['settings', 'teamContext', 'commonServices', '$rootScope',directiveFn]);

    function directiveFn(settings, teamContext, commonServices, $rootScope) {
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

                scope.respondToRequest = function (request, approve) {
                    teamContext.respondToRequest(request.teamId, request.playerId, approve).then(
                        function (res) {
                            $rootScope.$broadcast('update-team-requests');
                        }, function (err) {
                            commonServices.handleError(err);
                        })
                }
            }
        }
    }
})();