'use strict';
angular.module('controller')
  .controller('addDefaultController', ['$scope','confirm','$http','$filter','objParse',function (s,confirm,$http,$filter,objParse) {
        s.defaultTips=[];
        s.select={};
        s.alter={};
        s.Default={
            huaweishow:true,
            xiaomishow:true,
            samsungshow:true,
            iphoneshow:true
        }
        s.addDefault=function(Default){
            var obj=objParse(Default,[function(k,v,next){
                if(v===true){
                    next(1);
                }else if(v===false){
                    next(0);
                }else{
                    next(v);    
                }
            }]);
            confirm({title:'再次确认!',content:'你要提交的故障为:'+$filter('json')(obj),ok:'确认',cancel:'取消'})
            .then(function(){
                $http.post('api/price/addTrouble',obj).success(function(d){
                    if(d.code!=200){
                        alert(d.msg);
                    }else{
                        s.Default="";
                        s.defaultTips.unshift($filter('json')(d.data));
                        s.$emit('addNewDefault');
                    }
                });
            },function(){
            })
        }
        s.updateDefault=function(Default){
            var obj=objParse(Default,[function(k,v,next){
            
                if(v===true){
                    return next(1);
                }else if(v===false){
                    return next(0);
                }else{
                    return next(v);    
                }
            }]);
            confirm({title:'再次确认!',content:'你要提交的故障为:'+$filter('json')(obj),ok:'确认',cancel:'取消'})
            .then(function(){
                $http.post('api/price/updateTrouble',obj).success(function(d){
                    if(d.code!=200){
                        alert(d.msg);
                    }else{
                        s.alter={};
                        s.select={};
                        s.alter.tip="已更新"+d.data+"条数据"+$filter('json')(obj);
                        s.$emit('updateDefault');
                    }
                });
            });
        }
        function freshDefault(){        
            $http.get('api/price/getTrouble').success(function(data){                                
                var ooo=objParse(data.data.data,[function(k,v,n){
                    if(k.match(/show$/i)){                        
                        if(v==1){
                            return n(true);
                        }else {
                            return n(false);
                        }
                    }
                    return n(v);
                }]);                
                s.select.defaults=ooo;
            })
        }
        freshDefault();
        s.$on('addNewDefault',freshDefault);
        s.$on('updateDefault',freshDefault);
        s.$watch('select.default',function(d){
            s.alter.default=angular.extend({},d,true);
        });
}]);