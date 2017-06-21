﻿(function () {
    'use strict';

    angular.module('mainApp')
        .service('mapService', ['$http', 'commonServices', map]);

    function map($http, commonServices) {

        var _getAddressCoordinates = function (address, callback) {
            var geocoder = new google.maps.Geocoder;
            return geocoder.geocode({ address: address }, callback);
        }

        var _addMarker = function (latLng, map) {
            var marker = new google.maps.Marker({ position: latLng, map: map});
            map.panTo(latLng);
            return marker;
        }

        var _getAddress = function (latLng) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latLng.lat() + ',' + latLng.lng() + '&sensor=false');
        }

        var _getCurrentPosition = function (cbSuccess, cbError) {
            navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
        }

        var _getLatFromLocation = function (loc) {
            return angular.isFunction(loc.geometry.location.lat) ? loc.geometry.location.lat() : loc.geometry.location.lat
        }

        var _getLngFromLocation = function (loc) {
            return angular.isFunction(loc.geometry.location.lng) ? loc.geometry.location.lng() : loc.geometry.location.lng
        }

        var _getAddressComponents = function (place) {
            var components;

            components = {};

            angular.forEach(place.address_components, function (address_component) {
                angular.forEach(address_component.types, function (type) {
                    components[type] = address_component.long_name;
                    if (type == 'administrative_area_level_2') { //Province
                        components['administrative_area_level_2_short'] = address_component.short_name;
                    } else if (type == 'administrative_area_level_1') { //Region
                        components['administrative_area_level_1_short'] = address_component.short_name;
                    } else if (type == 'country') {
                        components['country_short'] = address_component.short_name;
                    }
                });
            });

            return components;
        }

        var _getCityFromLocation = function (loc) {

            var addressComponents = _getAddressComponents(loc);
            var city = { country: {}}

            if (addressComponents) {
                if (addressComponents.locality) {
                    city.shortName = addressComponents.locality
                    city.longName = city.shortName
                    if (addressComponents.administrative_area_level_2) {
                        city.longName = city.longName + ', ' + addressComponents.administrative_area_level_2
                    } else if (addressComponents.administrative_area_level_1) {
                        city.longName = city.longName + ', ' + addressComponents.administrative_area_level_1_short
                    }
                }

                if (addressComponents.country) {
                    city.country.longName = addressComponents.country
                    city.country.shortName = addressComponents.country_short
                }

                return city;
            }

        }

        var _validateCity = function (city) {
            if (!city) {
                commonServices.toast.error('Failed to retrieve location details.' +
                    ' Please try a different location.');
                return false
            } else {

                if (city.country) {

                    if (city.country.shortName != 'PH') {
                        commonServices.toast.error('We\'re very sorry but we currently only support locations' +
                            ' within the Philippines. We\'re currently working to expand our' +
                            ' coverage. We\'ll let you know once were done. Thank you for understanding.');
                        return false
                    } else if (!city.shortName) {
                        commonServices.toast.error('Could not retrieve city name.' +
                        ' Please try a different location.');
                        return false
                    }
                } else {
                    commonServices.toast.error('Could not retrieve country name.' +
                    ' Please try a different location.');

                    return false
                }
            }

            return true
        }

        this.getAddressCoordinates = _getAddressCoordinates;
        this.addMarker = _addMarker;
        this.getAddress = _getAddress;
        this.getCurrentPosition = _getCurrentPosition
        this.getLatFromLocation = _getLatFromLocation;
        this.getLngFromLocation = _getLngFromLocation;
        this.getAddressComponents = _getAddressComponents;
        this.getCityFromLocation = _getCityFromLocation;
        this.validateCity = _validateCity;
        return this;
    }

})();