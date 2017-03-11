(function () {
  'use strict';

  angular
    .module('mainApp')
    .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {

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
        });


    $locationProvider.hashPrefix('');

  }

})()