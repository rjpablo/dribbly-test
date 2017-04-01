﻿/// <reference path="courts.listItem.template.html" />
(function () {
	'use strict';

	angular.module('mainApp').directive('courtsListItem', courtListItemDirective);

	function courtListItemDirective() {
		return {
			//priority: 2,
			restrict: "E",
			scope: {
			    'court': '=',
                'ngSrcPrefix' : '='
			},
			templateUrl: '/js/directives/courtsListItem/courts.listItem.template.html'
		}
	}
})()