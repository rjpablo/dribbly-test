(function () {
    'user strict';

    angular.module('mainApp')
        .service('gameContext', ['httpService', 'settings', 'fileService', '$q', ctxFn]);

    function ctxFn(httpService, settings, fileService, $q) {

        var _apiCtrlBaseUrl = settings.apiBaseURL + 'Games/';

        var _getGames = function (filters) {
            if (filters) {
                return httpService.post(_apiCtrlBaseUrl, filters)
            } else {
                return httpService.post(_apiCtrlBaseUrl)
            }
        }

        var _getGameDetails = function (courtId) {
            return httpService.get(_apiCtrlBaseUrl, { courtId: courtId })
        }

        var _create = function (court) {
            return httpService.post(_apiCtrlBaseUrl + 'register/', court);
        }

        var _deletePhoto = function (fileName, userId) {
            return fileService.deleteCourtPhoto(fileName, userId);
        }

        var _updateGame = function (court) {
            return httpService.put(_apiCtrlBaseUrl + 'update/', court);
        }

        var _searchGames = function (criteria) {
            return httpService.get(_apiCtrlBaseUrl + 'search', { searchCriteria: criteria })
        }

        var _getTestGames = function () {
            return [{
                gameId: 0,
                title: 'Test Game 001',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: null,
                court: {
                    id: 18,
                    name: 'Ballers Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Test Team 2',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            },
            {
                gameId: 0,
                title: 'Test Game 002',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: 1,
                court: {
                    id: 18,
                    name: 'Ballers Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Team with long Name',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Test Team 2',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            },
            {
                gameId: 0,
                title: 'Test Game 003',
                schedule: new Date(),
                teamAScore: 0,
                teamBScore: 0,
                courtId: 1,
                teamAId: 1,
                teamBId: 2,
                winningTeamId: 2,
                court: {
                    id: 18,
                    name: 'Kamakawili Habululu Basketball Court',
                    address: '#123 Paraiso St., Makati City, Manila',
                    rate: '400',
                    contactNo: '+63 932 987 7865',
                    imagePath: '1.jpg',
                    userId: 'test-user'
                },
                teamA: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                },
                teamB: {
                    teamId: 2,
                    teamName: 'Team with long Name',
                    isTemporary: false
                },
                winningTeam: {
                    teamId: 1,
                    teamName: 'Test Team 1',
                    isTemporary: false
                }
            }]
        }

        this.create = _create;
        this.getGames = _getGames;
        this.getGameDetails = _getGameDetails;
        this.deletePhoto = _deletePhoto;
        this.updateGame = _updateGame;
        this.searchGames = _searchGames;
        this.getTestGames = _getTestGames;

        return this;

    }

})();