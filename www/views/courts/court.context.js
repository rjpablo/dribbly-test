(function () {
    'user strict';

    angular.module('mainApp')
        .service('courtContext', ['httpService', 'settings', 'fileService', '$q', courtContext]);

    function courtContext(httpService, settings, fileService, $q) {

        var _courtSearchRemoteUrl = settings.apiBaseURL + 'court/FindCourtsByName/';

        var _getCourts = function (filters) {
            if (filters) {
                return httpService.post(settings.apiBaseURL + 'courts', filters)
            } else {
                return httpService.post(settings.apiBaseURL + 'courts')
            }
        }

        var _getCourtDetails = function (courtId) {
            return httpService.get(settings.apiBaseURL + 'court', { courtId: courtId })
        }

        var _register = function (court) {
            return httpService.post(settings.apiBaseURL + 'court/register/', court);
        }

        var _deletePhoto = function (fileName, userId) {
            return fileService.deleteCourtPhoto(fileName, userId);
        }

        var _updateCourt = function (court) {
            return httpService.put(settings.apiBaseURL + 'court/update/', court);
        }

        var _updatePrimaryPhoto = function (courtId, fileName) {
            return httpService.put(encodeURI(settings.apiBaseURL + 'court/setPrimaryPhoto/?courtId=' + courtId + '&fileName=' + fileName));
        }

        var _searchCourts = function (criteria) {
            return httpService.get(settings.apiBaseURL + 'courts/search', { searchCriteria: criteria })
        }

        var _getMaxRate = function () {
            var deferred = $q.defer();

            deferred.resolve(2000);

            return deferred.promise;
        }

        var _followCourt = function (courtId, userId) {
            return httpService.put(settings.apiBaseURL + 'court/follow/' + courtId + '/' + userId)
        }

        var _unfollowCourt = function (courtId, userId) {
            return httpService.put(settings.apiBaseURL + 'court/unfollow/' + courtId + '/' + userId)
        }

        var _getUserToCourtRelation = function (courtId, userId) {
            return httpService.get(settings.apiBaseURL + 'court/getUserToCourtRelation', { courtId: courtId, userId: userId })
        }

        var _getTestCourts = function () {
            return [
            {
                id: 1,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '400',
                contactNo: '+63 932 987 7865',
                imagePath: '1.jpg',
                userId: 'test-user'
            },
            {
                id: 2,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: '2.jpg',
                userId: 'test-user'
            },
            {
                id: 3,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '550',
                contactNo: '+63 932 123 5665',
                imagePath: '3.jpg',
                userId: 'test-user'
            },
            {
                id: 4,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '200',
                contactNo: '+63 932 987 7865',
                imagePath: '4.jpg',
                userId: 'test-user'
            },
            {
                id: 5,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250',
                contactNo: '+63 932 123 7865',
                imagePath: '5.jpg',
                userId: 'test-user'
            },
            {
                id: 6,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500',
                contactNo: '+63 932 123 5665',
                imagePath: '2.jpg',
                userId: 'test-user'
            },
            {
                id: 1,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '250',
                contactNo: '+63 932 987 7865',
                imagePath: '1.jpg',
                userId: 'test-user'
            },
            {
                id: 2,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '750',
                contactNo: '+63 932 123 7865',
                imagePath: '2.jpg',
                userId: 'test-user'
            },
            {
                id: 3,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '800',
                contactNo: '+63 932 123 5665',
                imagePath: '3.jpg',
                userId: 'test-user'
            },
            {
                id: 4,
                name: 'Ballers Court',
                address: '#123 Paraiso St., Makati City, Manila',
                rate: '450',
                contactNo: '+63 932 987 7865',
                imagePath: '4.jpg',
                userId: 'test-user'
            },
            {
                id: 5,
                name: 'Masters Court',
                address: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '400',
                contactNo: '+63 932 123 7865',
                imagePath: '5.jpg',
                userId: 'test-user'
            },
            {
                id: 6,
                name: 'XYZ Basketball Court',
                address: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '550',
                contactNo: '+63 932 123 5665',
                imagePath: '2.jpg',
                userId: 'test-user'
            }
            ];
        }

        this.register = _register;
        this.getCourts = _getCourts;
        this.getCourtDetails = _getCourtDetails;
        this.deletePhoto = _deletePhoto;
        this.updateCourt = _updateCourt;
        this.updatePrimaryPhoto = _updatePrimaryPhoto;
        this.searchCourts = _searchCourts;
        this.getTestCourts = _getTestCourts;
        this.getMaxRate = _getMaxRate;
        this.courtSearchRemoteUrl = _courtSearchRemoteUrl;
        this.followCourt = _followCourt;
        this.unfollowCourt = _unfollowCourt;
        this.getUserToCourtRelation = _getUserToCourtRelation;

        return this;

    }

})();