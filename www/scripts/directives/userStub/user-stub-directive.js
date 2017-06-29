(function () {
    'use strict';

    angular.module('mainApp').directive('userStub', ['settings',directiveFn]);

    function directiveFn(settings) {
        return {
            restrict: 'E',
            scope: {
                'user': '=',
                'showControls': '=?',
                'deleteFunction': '&?'
            },
            replace: true,
            templateUrl: '/scripts/directives/userStub/user-stub-directive-template.html',
            link: function (scope, element, attrs) {
                
                function setPicUrl(user) {
                    if (scope.user) {
                        if (user.profilPic) {
                            scope.profilePicUrl = settings.fileUploadBasePath + user.userId + '/photos/' + user.profilPic
                        } else {
                            scope.profilePicUrl = settings.defaultProfilePicUrl;
                        }
                    }
                }

                function checkRole() {
                    scope.role = attrs['role'];
                    if (scope.user) {
                        if ((scope.role == 'player' && scope.user.isPlaying) || (scope.role == 'coach' && scope.user.isCoaching)) {

                        } else {
                            scope.role = 'user';
                        }
                    }
                }

                scope.$watch('user', function (newUser) {
                    setPicUrl(newUser);
                    checkRole()
                })
            }
        }
    }
})();