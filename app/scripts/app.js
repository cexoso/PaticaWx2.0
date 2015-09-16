'use strict';
angular.module('paticaApp', [  
  'ui.router'
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: 'views/index.html',
    controller:'indexController'
  })
}]);
