(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('playerProfileController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', 'profileContext', 'playersContext', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, profileContext, playersContext) {

        var vm = this;

        profileContext.getPlayerProfile($scope.profile.details.userId).then(
            function (res) {
                if (res.data) {
                    $scope.profile.player = res.data
                } else {

                }
            }, function (err) {
                commonServices.handleError(err)
            })

        vm.setPlayerProfile = function () {
            playersContext.addPlayer(
                {
                    userId: $scope.profile.details.userId,
                    dateCreated: new Date()
                }).then(function (res) {
                    if (res.data) {
                        $scope.profile.player = res.data;
                    } else {
                        commonServices.toast.error("Creation of player profile failed. Please try again.")
                    }
                }, function (err) {
                    commonServices.handleError(err)
                })
        }

    };

})();