'use strict';
angular.module('paticaApp', [  
  'ui.router',
  'ui.bootstrap',
  'ngSanitize',
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/manage');
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: 'views/index.html'
  })
}
]);
