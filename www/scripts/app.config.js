(function () {
    'use strict';

    angular
      .module('mainApp')
      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uibTooltipProvider', '$httpProvider', config]);

    function config($stateProvider, $urlRouterProvider, $locationProvider, $uibTooltipProvider, $httpProvider) {

        var _enableHtml5Mode = true; //must sync with _useHtml5Mode variable value in settings.service.js
        $urlRouterProvider.otherwise('courts');
        $httpProvider.interceptors.push('authInterceptorService');

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'views/account/login/login.html'
            })

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

          .state('profile.playerProfile', {
              params: { userName: null },
              url: '/playerProfile/{userName}',
              templateUrl: 'views/profile/player/player.profile.html'
          })

           /* Courts */

          .state('courts', {
              abstract: true,
              default: '.find',
              url: '',
              templateUrl: 'views/courts/courts/courts.html'
          })

          .state('courts.find', {
              url: '/courts',
              templateUrl: 'views/courts/courts/findCourts/find-courts.html'
          })

          .state('courts.followed', {
              url: '/followed',
              templateUrl: 'views/courts/courts/followedCourts/followed-courts.html'
          })

          .state('courts.myCourts', {
              url: '/myCourts',
              templateUrl: 'views/courts/courts/myCourts/my-courts.html'
          })

           /* Teams */

          .state('teams', {
              url: '/teams',
              templateUrl: 'views/teams/teams/teams.html'
          })

           /* Team */

          .state('team', {
              abstract: true,
              default: '.members',
              url: '/team',
              templateUrl: 'views/teams/team-details/team-details.html'
          })

          .state('team.games', {
              url: '/games/{teamId}',
              templateUrl: 'views/teams/team-details/games/team-games.html'
          })

          .state('team.members', {
              abstract: true,
              default: '.members',
              url: '/members',
              templateUrl: 'views/teams/team-details/members/team-members.html'
          })

          .state('team.members.current', {
              url: '/current/{teamId}',
              templateUrl: 'views/teams/team-details/members/current-members/current-members.html'
          })

          .state('team.members.former', {
              url: '/former/{teamId}',
              templateUrl: 'views/teams/team-details/members/former-members/former-members.html'
          })

          .state('team.members.requests', {
              url: '/requests/{teamId}',
              templateUrl: 'views/teams/team-details/members/requests/member-requests.html'
          })

          .state('team.members.invitations', {
              url: '/invitations/{teamId}',
              templateUrl: 'views/teams/team-details/members/invitations/member-invitations.html'
          })

          /* Court */

          .state('court', {
              abstract: true,
              default: '.details',
              url: '/court',
              templateUrl: 'views/courts/court/court.html'
          })

          .state('court.details', {
              params: { id: null },
              url: '/details/{id}',
              templateUrl: 'views/courts/court/details/court.details.html'
          })

          .state('court.schedule', {
              params: { id: null },
              url: '/schedule/{id}',
              templateUrl: 'views/courts/court/schedule/court.schedule.html'
          })

          .state('court.photos', {
              params: { id: null },
              url: '/photos/{id}',
              templateUrl: 'views/courts/court/photos/court.photos.html'
          })

          .state('court.videos', {
              params: { id: null },
              url: '/videos/{id}',
              templateUrl: 'views/courts/court/videos/court.videos.html'
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

          /* Game */
          .state('gameDetails', {
              abstract: true,
              default: '.players',
              url: '/gameDetails',
              templateUrl: 'views/games/gameDetails/gameDetails.html'
          })

          .state('gameDetails.players', {
              url: '/players/{gameId}',
              templateUrl: 'views/games/gameDetails/players/gamePlayers.html'
          })

          .state('gameDetails.requestingTeams', {
              url: '/requesting-teams/{gameId}',
              templateUrl: 'views/games/gameDetails/requesting-teams/requesting-teams.html'
          })

          /* Add Photos/Videos, Invites, Requests */

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


        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(_enableHtml5Mode);

        $uibTooltipProvider.options({
            placement: "bottom",
            animate: true,
            appenToBody: false
        })

    }

})();