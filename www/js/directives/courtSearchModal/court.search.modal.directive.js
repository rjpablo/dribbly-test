/// https://jsfiddle.net/ValentinH/954eve2L/ for examples on rz-slider />
(function () {
    'use strict';

    angular.module('mainApp').directive('courtSearchModal', ['$uibModal', courtSearchModalDirective]);

    function courtSearchModalDirective($uibModal) {
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
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/js/directives/courtSearchModal/court.search.modal.template.html',
                        resolve: {
                            searchCriteria: scope.searchCriteria
                        },
                        controller: function ($scope, commonServices, $uibModalInstance, $timeout, searchCriteria) {                            
                            
                            $scope.searchCriteria = searchCriteria;

                            $scope.slider = {
                                options: {
                                    floor: 0,
                                    ceil: 3000,
                                    step: 50,
                                    translate: function (value) {
                                        return '&#8369;' + value;
                                    },
                                    hideLimitLabels: true
                                }
                            }

                            $scope.cities = ['--Any City--', 'Makati', 'Ortigas', 'Mandaluyong', 'Manila', 'Sampaloc', 'Pasig']

                            if (!searchCriteria) {
                                $scope.searchCriteria = {
                                    rangeMin: $scope.slider.options.floor,
                                    rangeMax: $scope.slider.options.ceil
                                }
                            }

                            var refreshSlider = function () {
                                $timeout(function () {
                                    $scope.$broadcast('rzSliderForceRender');
                                });
                            };

                            $scope.ok = function (e) {
                                $uibModalInstance.close($scope.searchCriteria);
                            };

                            $scope.cancel = function (e) {
                                $uibModalInstance.dismiss('cancel');
                            };

                            refreshSlider();


                        },
                        size: 'md'
                    });
                    courtSearchModal.result.then(function (searchCriteria) {
                        vm.searchCriteria = searchCriteria;
                        scope.onSubmit({ criteria: searchCriteria })
                    }, function (reason) {
                        //commonServices.toast.info('No new court was added.')
                    });
                }

            }
        }
    }
})()