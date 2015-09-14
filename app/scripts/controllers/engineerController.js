'use strict';
angular.module('controller')
  .controller('engineerController', ['$scope','$modalInstance','$http',function (s,$modalInstance,$http) {
        $http.post('api/order/getUserByParam',{
            type:0,
            page:{
                "size":50, 
                "index": 1
            }
        }).success(function(d){
            if(d.code!=200){
                alert(d.msg);
            }else{
                s.engineers=d.data.data;
            }
        });
        s.data={};
        s.assign=function(){
            $modalInstance.close(s.data.engineer);
        }
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        };
}]);