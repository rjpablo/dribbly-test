(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('mainCtrl',['$scope','$state', mainCtrl]);

    function mainCtrl($scope,$state) {
        $scope.state = $state;
    }

})();