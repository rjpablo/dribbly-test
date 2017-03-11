(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('courtCtrl', ['$scope', courtCtrl]);

    function courtCtrl() {

        this.courtsSearched = [
            {
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200 per hour',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/1.jpg'
            },
            {
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250 per hour',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/2.jpg'
            },
            {
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500 per hour',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/3.jpg'
            },
            {
                name: 'Ballers Court',
                location: '#123 Paraiso St., Makati City, Manila',
                rate: '200 per hour',
                contactNo: '+63 932 987 7865',
                imagePath: 'images/sample images/courts/1.jpg'
            },
            {
                name: 'Masters Court',
                location: '#123 Pinaglabanan St., San Juan, Manila',
                rate: '250 per hour',
                contactNo: '+63 932 123 7865',
                imagePath: 'images/sample images/courts/2.jpg'
            },
            {
                name: 'XYZ Basketball Court',
                location: '#33 Connecticut St., Sampaloc City, Manila',
                rate: '500 per hour',
                contactNo: '+63 932 123 5665',
                imagePath: 'images/sample images/courts/3.jpg'
            }
        ]

        this.tabs = [
            { heading: 'Dynamic Title 1', content: 'Dynamic content 1' },
            { heading: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
        ];

        this.model = {
            name: 'Tabs'
        };
    }

})();