(function () {
  'use strict';

  angular
    .module('mainApp')
    .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $uibTooltipProvider) {

    $urlRouterProvider.otherwise('courts');

    $stateProvider
        .state('courts', {
            abstract: true,
            default: '.find',
            url: '',
            templateUrl: 'views/courts/courts/courts.html'
        })

        .state('courts.find', {
            url:'/courts',
            templateUrl: 'views/courts/courts/findCourts/find-courts.html'
        })

        .state('courts.followed', {
            url:'/followed',
            templateUrl: 'views/courts/courts/followedCourts/followed-courts.html'
        })

        .state('courts.myCourts', {
            url:'/myCourts',
            templateUrl: 'views/courts/courts/myCourts/my-courts.html'
        })

        .state('games', {
            url: '/games',
            templateUrl: 'views/game/games.html'
        })

        .state('players', {
            url: '/players',
            templateUrl: 'views/player/players.html'
        })

        .state('court', {
            url: '/court/{id}',
            params: {
                id:null
            },            
            views: {
                '':{
                    templateUrl: 'views/courts/court/details/court.details.html',
                },
                'schedule@court': {
                    templateUrl: 'views/courts/court/schedule/court.schedule.html'
                }
            }
        })

        .state('court.schedule', {
            url: '/court/{id}',
            params: {
                id: null
            },
            templateUrl: 'views/court/courtDetails/court.schedule.html'
        });


    $locationProvider.hashPrefix('');
      //$locationProvider.html5Mode(true);

    $uibTooltipProvider.options({
        placement: "bottom",
        animate: true,
        appenToBody: false
    })

  }

})()