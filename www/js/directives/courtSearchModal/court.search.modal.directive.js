﻿/// https://jsfiddle.net/ValentinH/954eve2L/ for examples on rz-slider />
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
                        controller: function ($scope, commonServices, $uibModalInstance, $timeout, searchCriteria, courtContext) {

                            $scope.searchCriteria = angular.copy(searchCriteria);
                            $scope.cities = ['--Any City--', 'Makati', 'Ortigas', 'Mandaluyong', 'Manila', 'Sampaloc', 'Pasig']

                            courtContext.getMaxRate().then(
                                function (res) {

                                    $scope.slider = {
                                        options: {
                                            floor: 0,
                                            ceil: res,
                                            step: 50,
                                            translate: function (value) {
                                                return '&#8369;' + value;
                                            },
                                            hideLimitLabels: true
                                        }
                                    }

                                    if (searchCriteria.rangeMin == null || searchCriteria.rangeMax == null) {
                                        $scope.searchCriteria = {
                                            rangeMin: $scope.slider.options.floor,
                                            rangeMax: $scope.slider.options.ceil
                                        }
                                    } else if (searchCriteria.rangeMax > $scope.slider.options.ceil) {
                                        searchCriteria.rangeMax = $scope.slider.options.ceil
                                    }

                                    refreshSlider();

                                }, function (err) {
                                    commonServices.toast.error('Unable to retrieve maximum rate.')
                                })

                            var refreshSlider = function () {
                                $timeout(function () {
                                    $scope.$broadcast('rzSliderForceRender');
                                });
                            };

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
})();