(function () {
  'use strict';

  angular
    .module('mainApp')
    .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $uibTooltipProvider) {

    $urlRouterProvider.otherwise('courts');

    $stateProvider
        .state('courts', {
          url: '/courts',
          templateUrl: 'views/court/courts.html'
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
            templateUrl: 'views/court/courtDetails/court.details.html'
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