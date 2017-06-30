(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamMembersController', ['$scope', 'settings', 'commonServices',
            'authentication', 'teamContext', controllerFn]);

    function controllerFn($scope, settings, commonServices, authentication, teamContext) {

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

    };

})();