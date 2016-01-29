'use strict';
/* Filters */
/**
 * @ngdoc overview
 * @name elementFilter
 * @description
 * # elementFilter
 *
 * Main module of the application.
 */
angular.module('elementFilter', []).filter('questionName', function() {
  return function(question) {
    return question.slice(question.length-3, question.length);
  };
});
