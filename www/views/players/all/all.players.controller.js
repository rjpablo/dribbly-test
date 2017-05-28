(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('allPlayersCtrl', ['$scope', '$uibModal', '$document', 'settings', 'httpService', 'commonServices', '$timeout', 'playersContext', 'authentication', courtCtrl]);

    function courtCtrl($scope, $uibModal, $document, settings, httpService, commonServices, $timeout, playersContext, authentication) {

        var vm = this;

        vm.searchCriteria = {
            playerName: '',
            address: '',
            city: '',
            mvpsMin: null,
            mvpsMax: null,
            rating :[],
            winRateMin: 1,
            winRateMax: 100
        }

        vm.searchCriteriaStr = ''
        vm.sortReverse = true;
        vm.sortIndex = 0;
        vm.sortObjects = [
            {
                description: 'Date Joined (Ascending)',
                field: 'dateJoined',
                reversed: false
            },
            {
                description: 'Date Joined (Descending)',
                field: 'dateJoined',
                reversed: true
            },
            {
                description: 'Player Name (Ascending)',
                field: 'userName',
                reversed: false
            },
            {
                description: 'Player Name (Descending)',
                field: 'userName',
                reversed: true
            },
            {
                description: 'MVPs (Ascending)',
                field: 'mvps',
                reversed: false
            },
            {
                description: 'MPVs (Descending)',
                field: 'mvps',
                reversed: true
            },
            {
                description: 'Win Rate (Ascending)',
                field: 'winRate',
                reversed: false
            },
            {
                description: 'Win Rate (Descending)',
                field: 'winRate',
                reversed: true
            }
        ]//Sort Objects
        vm.sortObject = vm.sortObjects[0]
        vm.searchCriteriaStr = '';
        vm.filtered = false; //whether or not the list is filtered
        vm.loading = false;

        this.players = [];
        this.playerImgSrcPrefix = settings.fileUploadBasePath;

        this.updateList = function () {
            playersContext.searchPlayers(vm.filtered ? vm.searchCriteria : undefined).then(
            function (result) {
                vm.players = result.data
            }, function (error) {
                commonServices.handleError(error);
                vm.players = null;
            });
        }

        if (settings.useLocalData) {
            
        } else {
            vm.loading = true;
            playersContext.searchPlayers(null).then(
            function (result) {
                vm.players = result.data
                vm.loading = false
            }, function (error) {
                commonServices.handleError(error);
                vm.players = null;
                vm.loading = false
            });
        }

        vm.search = function (criteria) {
            vm.searchCriteria = criteria;
            buildSearchCriteriaStr()
            playersContext.searchPlayers(criteria).then(
                function (res) {
                    vm.searchCriteria = criteria;
                    vm.filtered = vm.searchCriteriaStr.trim() != '';
                    vm.players = res.data;
                }, function (err) {
                    commonServices.handleError(err)
                }
            )
        }

        function buildSearchCriteriaStr() {
            var str = '';

            if (vm.searchCriteria.playerName) {
                str = str + 'Name contains \'' + vm.searchCriteria.playerName + '\', '
            }
            if (vm.searchCriteria.sex) {
                str = str + (vm.searchCriteria.sex=='M'?'Male':'Female') + ', '
            }
            if (vm.searchCriteria.heightFtMin && vm.searchCriteria.heightInMin) {
                str = str + 'Min. Height: ' + vm.searchCriteria.heightFtMin + '\' ' + vm.searchCriteria.heightInMin + '", '
            }
            if (vm.searchCriteria.heightFtMax && vm.searchCriteria.heightInMax) {
                str = str + 'Max. Height: ' + vm.searchCriteria.heightFtMax + '\' ' + vm.searchCriteria.heightInMax + '", '
            }
            if (vm.searchCriteria.mvpsMin) {
                if (vm.searchCriteria.mvpsMax) {
                    if (vm.searchCriteria.mvpsMin == vm.searchCriteria.mvpsMax) {
                        str = str + 'MVPs: ' + vm.searchCriteria.mvpsMin + ', '
                    } else {
                        str = str + 'MVPs: ' + vm.searchCriteria.mvpsMin + ' - ' + vm.searchCriteria.mvpsMax + ', '
                    }
                } else {
                    str = str + 'MVPs: at least ' + vm.searchCriteria.mvpsMin + ', '
                }                
            } else if (vm.searchCriteria.mvpsMax) {
                str = str + 'MVPs: 0 - ' + vm.searchCriteria.mvpsMax + ', '
            }
            if (vm.searchCriteria.dribblingMin) {
                if (vm.searchCriteria.dribblingMax) {
                    if (vm.searchCriteria.dribblingMin == vm.searchCriteria.dribblingMax) {
                        str = str + 'Dribbling Skills: ' + vm.searchCriteria.dribblingMin + ' star(s), '
                    } else {
                        str = str + 'Dribbling Skills: ' + vm.searchCriteria.dribblingMin + ' - ' + vm.searchCriteria.dribblingMax + ' star(s), '
                    }
                } else {
                    str = str + 'Dribbling Skills: at least ' + vm.searchCriteria.dribblingMin + ' star(s), '
                }
            } else if (vm.searchCriteria.dribblingMax) {
                str = str + 'Dribbling Skills: 0 - ' + vm.searchCriteria.dribblingMax + ' star(s), '
            }
            if (vm.searchCriteria.shootingMin) {
                if (vm.searchCriteria.shootingMax) {
                    if (vm.searchCriteria.shootingMin == vm.searchCriteria.shootingMax) {
                        str = str + 'Shooting Skills: ' + vm.searchCriteria.shootingMin + ' star(s), '
                    } else {
                        str = str + 'Shooting Skills: ' + vm.searchCriteria.shootingMin + ' - ' + vm.searchCriteria.shootingMax + ' star(s), '
                    }
                } else {
                    str = str + 'Shooting Skills: at least ' + vm.searchCriteria.shootingMin + ' star(s), '
                }
            } else if (vm.searchCriteria.shootingMax) {
                str = str + 'Shooting Skills: 0 - ' + vm.searchCriteria.shootingMax + ' star(s), '
            }
            if (vm.searchCriteria.threePtsMin) {
                if (vm.searchCriteria.threePtsMax) {
                    if (vm.searchCriteria.threePtsMin == vm.searchCriteria.threePtsMax) {
                        str = str + '3-Point Skills: ' + vm.searchCriteria.threePtsMin + ' star(s), '
                    } else {
                        str = str + '3-Point Skills: ' + vm.searchCriteria.threePtsMin + ' - ' + vm.searchCriteria.threePtsMax + ' star(s), '
                    }
                } else {
                    str = str + '3-Point Skills: at least ' + vm.searchCriteria.threePtsMin + ' star(s), '
                }
            } else if (vm.searchCriteria.threePtsMax) {
                str = str + '3-Point Skills: 0 - ' + vm.searchCriteria.threePtsMax + ' star(s), '
            }
            if (vm.searchCriteria.shootingMin) {
                if (vm.searchCriteria.shootingMax) {
                    if (vm.searchCriteria.shootingMin == vm.searchCriteria.shootingMax) {
                        str = str + 'Shooting Skills: ' + vm.searchCriteria.shootingMin + ' star(s), '
                    } else {
                        str = str + 'Shooting Skills: ' + vm.searchCriteria.shootingMin + ' - ' + vm.searchCriteria.shootingMax + ' star(s), '
                    }
                } else {
                    str = str + 'Shooting Skills: at least ' + vm.searchCriteria.shootingMin + ' star(s), '
                }
            } else if (vm.searchCriteria.shootingMax) {
                str = str + 'Shooting Skills: 0 - ' + vm.searchCriteria.shootingMax + ' star(s), '
            }
            if (vm.searchCriteria.passingMin) {
                if (vm.searchCriteria.passingMax) {
                    if (vm.searchCriteria.passingMin == vm.searchCriteria.passingMax) {
                        str = str + 'Passing Skills: ' + vm.searchCriteria.passingMin + ' star(s), '
                    } else {
                        str = str + 'Passing Skills: ' + vm.searchCriteria.passingMin + ' - ' + vm.searchCriteria.passingMax + ' star(s), '
                    }
                } else {
                    str = str + 'Passing Skills: at least ' + vm.searchCriteria.passingMin + ' star(s), '
                }
            } else if (vm.searchCriteria.passingMax) {
                str = str + 'Passing Skills: 0 - ' + vm.searchCriteria.passingMax + ' star(s), '
            }
            if (vm.searchCriteria.defenceMin) {
                if (vm.searchCriteria.defenceMax) {
                    if (vm.searchCriteria.defenceMin == vm.searchCriteria.defenceMax) {
                        str = str + 'Defensive Skills: ' + vm.searchCriteria.defenceMin + ' star(s), '
                    } else {
                        str = str + 'Defensive Skills: ' + vm.searchCriteria.defenceMin + ' - ' + vm.searchCriteria.defenceMax + ' star(s), '
                    }
                } else {
                    str = str + 'Defensive Skills: at least ' + vm.searchCriteria.defenceMin + ' star(s), '
                }
            } else if (vm.searchCriteria.defenceMax) {
                str = str + 'Defensive Skills: 0 - ' + vm.searchCriteria.defenceMax + ' star(s), '
            }

            vm.searchCriteriaStr = str
        }

        this.resetFilters = function () {
            vm.searchCriteria = {
                courtName: '',
                address: '',
                city: '',
            }

            vm.searchCriteriaStr = ''
            vm.filtered = false;

            vm.updateList();

        }

    };

})();