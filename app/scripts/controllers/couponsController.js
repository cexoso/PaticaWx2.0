'use strict';
angular.module('controller')
  .controller('couponsController', ['$scope','$http','$modal',function (s,$http,$modal) {
        $http.get('data/cardList.json').success(function(data){
            s.cardList=data;
        })
        s.alterC=function(order){
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/alterC.html',
                  controller: 'alterCController'
                  // ,size:'lg'
             });
            modalInstance.result.then(function(q){
                s.quoteList.push(q);
            },function(w){
                console.log(w)
            });
        }

}]).controller('alterCController',['$scope','$modalInstance','$http',function(s,$modalInstance,$http){

}]);