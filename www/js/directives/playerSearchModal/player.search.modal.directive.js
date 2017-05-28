/// https://jsfiddle.net/ValentinH/954eve2L/ for examples on rz-slider />
(function () {
    'use strict';

    angular.module('mainApp').directive('playerSearchModal', ['$uibModal', directiveFn]);

    function directiveFn($uibModal) {
        return {
            restrict: "A",
            scope: {
                searchCriteria: '=?',
                onSubmit: '&'
            },
            link: function (scope, element, attrs) {

                element.on('click', showDialog);

                function showDialog() {
                    var courtSearchModal = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        windowClass: 'player-search-modal',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/js/directives/playerSearchModal/player.search.modal.template.html',
                        resolve: {
                            searchCriteria: scope.searchCriteria
                        },
                        controller: function ($scope, commonServices, $uibModalInstance, $timeout, searchCriteria) {
                            
                            $scope.searchCriteria = angular.copy(searchCriteria);

                            $scope.ok = function (e) {
                                searchCriteria = angular.copy($scope.searchCriteria)
                                $uibModalInstance.close($scope.searchCriteria);
                            };

                            $scope.cancel = function (e) {
                                $uibModalInstance.dismiss('cancel');
                            };

                        },
                        size: 'md'
                    });
                    courtSearchModal.result.then(function (searchCriteria) {
                        scope.searchCriteria = searchCriteria;
                        scope.onSubmit({ criteria: searchCriteria })
                    }, function (reason) {
                        //commonServices.toast.info('No new court was added.')
                    });
                }
            }
        }
    }
})()