'use strict';
angular.module('controller')
  .controller('appendPeopleController', ['$scope','$modalInstance','$http',function (s,$modalInstance,$http) {
        s.sexL=false;
        s.user={
            type:0
        };
        s.ok = function () {
            s.user.sex={
                'false':'0',
                'true':'1'
            }[s.sexL];
            $http.post('api/order/addUser',s.user).success(function(d){
                if(d.code!=200){
                    alert(d.msg)
                }else{
                    $modalInstance.close("ok");        
                }
            })
        };
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        };
}]);