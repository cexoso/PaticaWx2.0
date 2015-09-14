'use strict';
angular.module('controller')
  .controller('addDefaultDetailController', ['$scope','confirm','$http','$filter','objParse','$q',function (s,confirm,$http,$filter,objParse,$q) {
        s.defaultTips=[];
        s.select={};
        s.alter={};
        s.altDefault={};
        s.Default={
            huaweishow:true,
            xiaomishow:true,
            samsungshow:true,
            iphoneshow:true,
            needcheck:true
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
                $http.post('api/price/addTroubleDetail',obj).success(function(d){
                    if(d.code!=200){
                        alert(d.msg);
                    }else{
                        s.Default={};
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
                $http.post('api/price/updateTroubleDetail',obj).success(function(d){
                    if(d.code!=200){
                        alert(d.msg);
                    }else{
                        s.alter={};
                        s.select={};
                        s.alter.tip="已更新"+d.data+"条数据"+$filter('json')(obj);
                        s.$emit('updateDefault');
                    }
                });
            },function(){
            })
        }
        function freshDefault(){        
            $http.get('api/price/getTrouble').success(function(data){                                
                var ooo=objParse(data.data.data,[function(k,v,n){
                    if(k.match(/needcheck|show$/i)){                        
                        if(v==1){
                            return n(true);
                        }else {
                            return n(false);
                        }
                    }
                    return n(v);
                }]);
                s.defaultList=ooo;   
                console.log(ooo)                 
                s.select.defaults=s.defaultList;
            })
        }
        freshDefault();
        s.$on('addNewDefault',freshDefault);
        s.$on('updateDefault',freshDefault);
        function getSubDefault(troubleid){
            return $http.get('api/price/getTroubleDetail',{
                    params:{
                        troubleid:troubleid    
                    }
                }).then(function(data){
                var ooo=objParse(data.data.data,[function(k,v,n){
                    if(k.match(/needcheck|show$/i)){                        
                        if(v==1){
                            return n(true);
                        }else {
                            return n(false);
                        }
                    }
                    return n(v);
                }]);
                var deferred=$q.defer();
                deferred.resolve(ooo.data);     
                return deferred.promise;
            })
        }
        s.$watch('select.default',function(d){
            if(d){
                s.Default.troubleid=d.id;
                getSubDefault(d.id).then(function(list){
                    s.select.subDefaults=list;                    
                });
            }else{
                delete s.Default.troubleid;
            }
            //s.alter.default=angular.extend({},d,true);
        });
        s.$watch('select.subDefault',function(d){
            s.altDefault=objParse(angular.extend({},d,true),[function(k,v,n){
                    if(k.match(/needcheck|show$/i)){                        
                        if(v==1){
                            return n(true);
                        }else {
                            return n(false);
                        }
                    }
                    return n(v);
            }]);
        });
}]);