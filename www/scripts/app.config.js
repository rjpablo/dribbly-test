(function () {
  'use strict';

  angular
    .module('mainApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uibTooltipProvider', config]);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $uibTooltipProvider) {

    $urlRouterProvider.otherwise('courts');

      $stateProvider

          .state('registration', {
              url: '/registration',
              templateUrl: 'views/account/registration/registration.html'
          })

         /* Profile */

        .state('profile', {
            abstract: true,
            default: '.main',
            url: '/profile',
            templateUrl: 'views/profile/profile.html'
        })

        .state('profile.main', {
            params: { userName: null },
            url: '/main/{userName}',
            templateUrl: 'views/profile/main/main.profile.html'
        })

        //.state('profile.main.photos', {
        //    params: { userName: null },
        //    url: '/photos/{userName}',
        //    templateUrl: 'views/profile/main/sub-contents/photos.html'
        //})

        //.state('profile.main.about', {
        //    params: { userName: null },
        //    url: '/about/{userName}',
        //    templateUrl: 'views/profile/main/sub-contents/about/about.html'
        //})

        //.state('profile.main.videos', {
        //    params: { userName: null },
        //    url: '/videos/{userName}',
        //    templateUrl: 'views/profile/main/sub-contents/videos.html'
        //})

        //.state('profile.main.activities', {
        //    params: { userName: null },
        //    url: '/activities/{userName}',
        //    templateUrl: 'views/profile/main/sub-contents/activities.html'
        //})

        .state('profile.playerProfile', {
            params: { userName: null },
            url: '/playerProfile/{userName}',
            templateUrl: 'views/profile/player/player.profile.html'
        })

        //.state('profile.playerProfile.details', {
        //    params: { userName: null },
        //    url: '/details/{userName}',
        //    templateUrl: 'views/profile/player/details/player.profile.details.html'
        //})

        //.state('profile.playerProfile.games', {
        //    params: { userName: null },
        //    url: '/games/{userName}',
        //    templateUrl: 'views/profile/player/games/player.profile.games.html'
        //})

         /* Courts */

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

         /* Teams */

        .state('teams', {
            url: '/teams',
            templateUrl: 'views/teams/teams/teams.html'
        })

        /* Court */

        .state('court', {
            abstract: true,
            default: '.details',
            url: '/court',
            templateUrl: 'views/courts/court/court.html'
        })

        .state('court.details', {
            url: '/details/{id}',
            templateUrl: 'views/courts/court/details/court.details.html'
        })

        .state('court.schedule', {
            url: '/schedule/{id}',
            templateUrl: 'views/courts/court/schedule/court.schedule.html'
        })

         /* Games */

        .state('games', {
            abstract: true,
            default: '.all',
            url: '/Games',
            templateUrl: 'views/games/games/games.html'
        })

        .state('games.all', {
            url: '',
            templateUrl: 'views/games/games/all/all-games.html'
        })

        .state('games.myGames', {
            url: '/my-games',
            templateUrl: 'views/games/games/my-games/my-games.html'
        })

        .state('games.followed', {
            url: '/followed',
            templateUrl: 'views/games/games/followed/followed-games.html'
        })

         /* Players */

        .state('players', {
            abstract: true,
            default: '.all',
            url: '/players',
            templateUrl: 'views/players/players.html'
        })

        .state('players.all', {
            url: '',
            templateUrl: 'views/players/all/all.players.html'
        })

        //.state('court', {
        //    url: '/court/{id}',
        //    params: {
        //        id:null
        //    },            
        //    views: {
        //        '':{
        //            templateUrl: 'views/courts/court/details/court.details.html',
        //        },
        //        'schedule@court': {
        //            templateUrl: 'views/courts/court/schedule/court.schedule.html'
        //        }
        //    }
        //})


    $locationProvider.hashPrefix('');
      //$locationProvider.html5Mode(true);

    $uibTooltipProvider.options({
        placement: "bottom",
        animate: true,
        appenToBody: false
    })

  }

})()