angular.module('controller')
  .controller('loginController', ['$scope','$http','user','$state',function (s,$http,user,$state) {
    s.loginClickHandle=function(){
        $http.post('api/login',s.user).success(function(d){
            if(d.code!=200){
                if(d.code==201){
                    s.tips="用户名密码不匹配";
                }
            }else{
                var data=d.data;
                user.set(data)
                console.log(user)
                $state.go('manage');
            }
        });
    }
}]);