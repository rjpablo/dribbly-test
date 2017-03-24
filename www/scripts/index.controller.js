(function () {
    'user strict';

    angular.module('mainApp')
        .controller('indexCtrl',['toastService', '$state', indexCtrl]);

    function indexCtrl(toastService, $state) {
        this.state = $state;
        this.toastSettings = toastService.settings;
    }

})();