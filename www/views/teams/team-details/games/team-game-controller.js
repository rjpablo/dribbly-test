(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('teamGamesController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', 'teamContext', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication, teamContext) {

        var vm = this;
        vm.loadingGames = true;
        vm.filter = 'upcoming';
        
        vm.loadGames = function(filter) {
            vm.filter = filter;
            vm.loadingGames = true;
            teamContext.getTeamGames($scope.team.details.teamId, filter).then(
                function (res) {
                    vm.loadingGames = false
                    $scope.team.games = res.data;
                }, function (err) {
                    vm.loadingGames = false
                    commonServices.handleError(err);
                })
        }

        $scope.$watch('team.details', function (teamDetails) {
            if (teamDetails) {
                vm.loadGames(vm.filter);
            }
        })

    };

})();