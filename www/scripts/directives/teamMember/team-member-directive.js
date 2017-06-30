(function () {
    'use strict';

    angular.module('mainApp').directive('teamMember', ['settings',directiveFn]);

    function directiveFn(settings) {
        return {
            restrict: 'E',
            scope: {
                'player': '=',
                'removeFunction': '&?'
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
            }
        }
    }
})();