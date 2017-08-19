(function () {
    'use strict';

    angular.module('mainApp').directive('courtStub', ['settings', directiveFn]);

    function directiveFn(settings) {
        return {
            restrict: 'E',
            scope: {
                'court': '=',
                'showControls': '=?',
                'deleteFunction': '&?'
            },
            replace: true,
            templateUrl: '/scripts/directives/courtStub/court-stub-directive.html',
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

                //scope.$watch('court', function (court) {
                    
                //})
            }
        }
    }
})();