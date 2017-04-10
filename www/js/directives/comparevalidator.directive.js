(function ()
{
    'use strict';

    /* Directive Used to control a Compare Validator function in an input field */
    angular
        .module('mainApp')
        .directive("matchField", ["$parse", directive]);

    function directive($parse) {
        return {
            priority: 2,
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                var compareField = $parse(attrs["matchField"]);

                var validate = function (value) {
                    var temp = compareField(scope)

                    var v = (value === temp) || (!value && !temp) ;

                    ctrl.$setValidity("match", v);

                    return value;
                };

                ctrl.$parsers.push(validate);
                ctrl.$formatters.push(validate);
                attrs.$observe("matchValue", function () {
                    validate(ctrl.$modelValue);
                });

                validate(ctrl.$modelValue);
            }
        }
    }
})();
