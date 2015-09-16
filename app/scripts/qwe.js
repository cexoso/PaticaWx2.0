angular.module('paticaApp')
.controller('indexController',['$scope','order',function(s,order){
    s.view={
        hello:'123'
    }
    s.submit=function(){
        order.save(s.order)
    }
    order.save().then(function(d){
        console.log(d)
    })
    order.alter().then(function(d){
        console.log(d)
    })
}]);

angular.module('paticaApp')
.service('order',['$http',function($http){
    function save(){
        return $http.post('api/order');
    }
    function alter(){
        return $http.put('api/order');
    }
    return {
        save:save,
        alter:alter
    }
}]);