'use strict';

angular.module('muffinapp')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html'
    };
  });
