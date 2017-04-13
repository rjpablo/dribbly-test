(function () {
    'user strict';

    angular.module('mainApp')
        .service('mapService', ['$http', map]);

    function map($http) {

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

        this.getAddressCoordinates = _getAddressCoordinates;
        this.addMarker = _addMarker;
        this.getAddress = _getAddress;
        this.getCurrentPosition =_getCurrentPosition
        return this;
    }

})();