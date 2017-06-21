/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('locationPicker', ['$uibModal', courtListItemDirective]);

    function courtListItemDirective($uibModal) {
        return {
            restrict: "EA",
            scope: {
                startPosition: '=?',
                onLocationSelect: '&?',
                requireCompleteAddress: '=?'
            },
            link: function (scope, element, attrs) {

                element.on('click', showDialog);

                function showDialog() {
                    var locationPickerModal = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/js/directives/locationPicker/location.picker.template.html',
                        controller: function ($scope, NgMap, mapService, commonServices, $uibModalInstance, $timeout) {
                            $scope.address;
                            $scope.completeAddress;
                            $scope.types = ['geocode']
                            $scope.center = '15,121';
                            $scope.requireCompleteAddress = scope.requireCompleteAddress;

                            $scope.selectedLocation = {
                                formatted_address: "",
                                latLng: {},
                                city: {
                                    contry: {}
                                }
                            }

                            NgMap.getMap({ id: 'locationPickerMap' }).then(function (map) {
                                $scope.map = map;
                                setInitialPosition();
                            });

                            var setInitialPosition = function () {
                                if ($scope.startPosition) {
                                    $scope.address = $scope.startPosition.formatted_address;
                                    $scope.completeAddress = $scope.startPosition.formatted_address;
                                    $scope.selectedLocation = $scope.startPosition;
                                    resetMark($scope.startPosition.geometry);
                                } else {
                                    focusCurrentPosition();
                                }
                            }

                            function focusCurrentPosition() {
                                mapService.getCurrentPosition(
                                    function (pos) {

                                        var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                                        centerMap(currentPos);

                                        //mapService.getAddress(currentPos).then(function (res) {
                                        //    if (res.data.results.length > 0) {

                                        //        //$scope.address = res.data.results[0].formatted_address;
                                        //        //$scope.completeAddress = res.data.results[0].formatted_address;
                                        //        //$scope.selectedLocation = res.data.results[0];
                                        //        //resetMark(res.data.results[0].geometry);

                                        //    } else {
                                        //        console.log('No address was retrieved.' +
                                        //            'Please try a different location.');
                                        //    }
                                        //}, function () {
                                        //    console.log('An error occured while trying to retrieve address' +
                                        //        ' based on clicked location.');
                                        //},
                                        //{ enableHighAccuracy: true });

                                    },
                                    function (error) {
                                        console.log('Unable to get location: ' + error.message);
                                    },
                                    { enableHighAccuracy: true })
                            }

                            var centerMap = function (latLng) {
                                $scope.map.setCenter(latLng);
                            }

                            $scope.focusCurrentSelection = function () {
                                $scope.map.setCenter($scope.selectedLocation.geometry.location);
                            }

                            $timeout(function () {
                                google.maps.event.trigger($scope.map, 'resize');
                            }, 1000);

                            $scope.mapClicked = function (e) {

                                mapService.getAddress(e.latLng).then(function (res) {
                                    if (res.data.results.length > 0) {

                                        var place = res.data.results[0]

                                        validatePlace(place)

                                    } else {
                                        commonServices.toast.error('No address was retrieved.' +
                                            'Please try a different location.');
                                    }
                                }, function () {
                                    commonServices.toast.error('An error occured while trying to retrieve address' +
                                        ' based on clicked location.');
                                });
                            }

                            var resetMark = function (e) {
                                if ($scope.locationMarker) { //delete marker if existing
                                    $scope.locationMarker.setMap(null);
                                    $scope.locationMarker = null;
                                }

                                $scope.locationMarker = mapService.addMarker((e.latLng || e.location), $scope.map, true);
                            }

                            $scope.getCoordinates = function (address) {

                            }

                            $scope.placeChanged = function (a, b, c, d) {
                                if ($scope.map) {
                                    var place = this.getPlace();
                                    if (place.geometry) {

                                        validatePlace(place)

                                    } else {
                                        mapService.getAddressCoordinates($scope.address, function (res, t) {
                                            if (res.length > 0) {
                                                place = res[0]

                                                if (validatePlace(place)) {
                                                    $scope.$apply();
                                                }

                                            } else {
                                                commonServices.toast.error('Unable to find entered location.')
                                            }
                                        })
                                    }
                                } else {
                                    commonServices.toast.error('The map has not been initialized. Please wait until it is initialized.')
                                }
                            }

                            var validatePlace = function (place) {
                                var city = mapService.getCityFromLocation(place)

                                if (mapService.validateCity(city)) {
                                    $scope.completeAddress = place.formatted_address;
                                    $scope.selectedLocation = place;
                                    $scope.selectedLocation.city = city;
                                    resetMark(place.geometry);
                                    $scope.map.setCenter(place.geometry.location || place.geometry.latLng);
                                    return true
                                }
                            }

                            $scope.ok = function (theForm) {
                                theForm.$submitted = true;
                                if (!($scope.requireCompleteAddress && theForm.fullAddress.$invalid) && $scope.selectedLocation.geometry) {
                                    $scope.selectedLocation.formatted_address = theForm.fullAddress.$modelValue;
                                    $uibModalInstance.close($scope.selectedLocation);
                                } else {
                                    commonServices.toast.error('Please fix error(s).')
                                }

                            };

                            $scope.cancel = function (e) {
                                $uibModalInstance.dismiss('cancel');
                            };

                        },
                        size: 'md'
                    });
                    locationPickerModal.result.then(function (loc) {
                        scope.onLocationSelect({ loc: loc })
                    }, function (reason) {
                        //commonServices.toast.info('No new court was added.')
                    });
                }

            }
        }
    }
})();