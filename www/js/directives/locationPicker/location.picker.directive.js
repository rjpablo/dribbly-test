/// <reference path="courts.listItem.template.html" />
(function () {
    'use strict';

    angular.module('mainApp').directive('locationPicker', ['$uibModal', courtListItemDirective]);

    function courtListItemDirective($uibModal) {
        return {
            restrict: "EA",
            scope: {
                onLocationSelect: '&?'
            },
            link: function (scope, element, attrs) {

                element.on('click', showDialog);

                function showDialog() {
                    var locatinoPickerModal = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/www/js/directives/locationPicker/location.picker.template.html',
                        controller: function ($scope, NgMap, mapService, commonServices, $uibModalInstance, $timeout) {
                            $scope.address;
                            $scope.types = ['geocode']
                            $scope.center = '15,121';

                            $scope.selectedLocation = {
                                formatted_address: "",
                                latLng: {}
                            }

                            NgMap.getMap({ id: 'locationPickerMap' }).then(function (map) {
                                $scope.map = map;
                                focusCurrentPosition();
                            });

                            function focusCurrentPosition() {
                                mapService.getCurrentPosition(
                                    function (pos) {

                                        var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                                        $scope.map.setCenter(currentPos);

                                        mapService.getAddress(currentPos).then(function (res) {
                                            if (res.data.results.length > 0) {

                                                $scope.address = res.data.results[0].formatted_address;
                                                $scope.selectedLocation = res.data.results[0];
                                                resetMark(res.data.results[0].geometry);

                                            } else {
                                                console.log('No address was retrieved.' +
                                                    'Please try a different location.');
                                            }
                                        }, function () {
                                            console.log('An error occured while trying to retrieve address' +
                                                ' based on clicked location.');
                                        },
                                        { enableHighAccuracy: true });

                                    },
                                    function (error) {
                                        console.log('Unable to get location: ' + error.message);
                                    })
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

                                        $scope.address = res.data.results[0].formatted_address;
                                        $scope.selectedLocation = res.data.results[0];
                                        resetMark(e);

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
                                        $scope.selectedLocation = place
                                        $scope.address = place.formatted_address;
                                        $scope.map.setCenter(place.geometry.location || place.geometry.latLng);
                                        resetMark(place.geometry);
                                    } else {
                                        mapService.getAddressCoordinates($scope.address, function (res, t) {
                                            if (res.length > 0) {
                                                $scope.map.setCenter(res[0].geometry.location)
                                                $scope.selectedLocation = res[0];
                                                $scope.selectedLocation.formatted_address = $scope.address; //override address
                                                resetMark(res[0].geometry)
                                                $scope.$apply();
                                            } else {
                                                commonServices.toast.error('Unable to find entered location.')
                                            }
                                        })
                                    }
                                } else {
                                    commonServices.toast.error('The map has not been initialized. Please wait until it is initialized.')
                                }
                            }

                            $scope.ok = function (e) {
                                $uibModalInstance.close($scope.selectedLocation);
                            };

                            $scope.cancel = function (e) {
                                $uibModalInstance.dismiss('cancel');
                            };

                        },
                        size: 'md'
                    });
                    locatinoPickerModal.result.then(function (loc) {
                        scope.onLocationSelect({ loc:loc })
                    }, function (reason) {
                        //commonServices.toast.info('No new court was added.')
                    });
                }

            }
        }
    }
})()