(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('mainProfileAboutController', ['$scope', 'settings', 'httpService', 'commonServices',
            'authentication', '$location', '$state', '$timeout', 'profileContext', controllerFn]);

    function controllerFn($scope, settings, httpService, commonServices, authentication,
        $location, $state, $timeout, profileContext) {

        var vm = this;
        vm.tempProfile = {}

        vm.onEditMode = false;
        vm.saving = false;

        vm.setEditMode = function (val) {
            vm.onEditMode = val
        }

        vm.edit = function () {
            vm.tempProfile =angular.copy($scope.profile.details)
            vm.onEditMode = true
        }

        vm.save = function (theForm) {
            vm.saving = true
            profileContext.updateProfile(vm.tempProfile).then(
                function (res) {
                    $scope.profile.details = angular.copy(vm.tempProfile)
                    commonServices.toast.success("Changes saved!")
                    vm.saving = false
                    vm.onEditMode = false
                }, function (err) {
                    commonServices.handleError(err)
                    vm.saving = false
                })
        }

        vm.cancel = function () {
            vm.onEditMode = false
        }

    };

})();