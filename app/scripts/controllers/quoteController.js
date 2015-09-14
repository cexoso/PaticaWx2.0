'use strict';
angular.module('services').service('resourceLoader',['$http',function($http){
    function get(url,opt){
        return $http.get(url,{
            cache:false,
            params:opt
        });
    }
    function loadBrand(opt){
        return get('api/price/getBrand',opt);
    }
    function loadBrandModel(opt){
        return get('api/price/getBrandModel',opt);
    }
    function loadTrouble(opt){
        return get('api/price/getTrouble',opt);
    }
    function loadTroubleDetail(opt){
        return get('api/price/getTroubleDetail',opt);   
    }
    function loadColor(){
        return [
            {name:'金色',id:'1'},
            {name:'灰色',id:'2'},
            {name:'白色',id:'3'},
            {name:'黑色',id:'4'}
        ]
    }
    function loadSource(){
        return [
            {name:'腾讯',id:'tengxun'},
            {name:'淘福利',id:'taofuli'}
        ]
    }
    function loadQuote(opt){
        return $http.post('api/price/getPriceByParam',opt);
    }
    return {
        loadBrandModel:loadBrandModel,
        loadBrand:loadBrand,
        loadTrouble:loadTrouble,
        loadTroubleDetail:loadTroubleDetail,
        loadColor:loadColor,
        loadSource:loadSource,
        loadQuote:loadQuote
    }
}]).service('autoResource',['resourceLoader',function(resourceLoader){
    function watch(s,obj){
        s.$watch(obj+".product",function(n){
            if(!n){
                return;
            }
            resourceLoader.loadBrand({
                producetype:n.id
            }).success(function(e){
                console.log(e)
                s.brands=e.data.data;
                s.filter.brand=s.brands[0];
            });
        });
        s.$watch(obj+".brand",function(n){
            if(!n){
                return;
            }
            resourceLoader.loadBrandModel({
                brandid:n.id
            }).success(function(e){
                console.log(e)
                s.brandModels=e.data.data;
                s.filter.brandModel=s.brandModels[0];
            });
        });
        s.$watch(obj+".trouble",function(n){
            if(!n){
                return;
            }
            resourceLoader.loadTroubleDetail({
                troubleid:n.id
            }).success(function(e){
                s.troubleDetails=e.data.data;
            });
        });
    }
    function loadCTS(s){
        s.colors=resourceLoader.loadColor();
        resourceLoader.loadTrouble().success(function(e){
            s.troubles=e.data.data;
        });
        s.sources=resourceLoader.loadSource();
    }
    function loadQuote(opt){
        return resourceLoader.loadQuote(opt);
    }
    return {
        watch:watch,
        loadCTS:loadCTS,
        loadQuote:loadQuote
    }
}]);
angular.module('controller')
  .controller('quoteController', ['$scope','autoResource','$http',function (s,autoResource,$http) {
        s.products=[
            {name:'手机',id:'200001'},
            {name:'电脑',id:'200002'},
        ]
        s.tips={
            btn:'查询',
            lastT:''
        }
        s.filter={};
        autoResource.watch(s,'filter');
        autoResource.loadCTS(s);
        s.filter.product=s.products[0];
        s.query=function(){
            s.tips.btn="正在查询";
            var detailid=null,
                  modelid=null,
                  offergoal=null;
            try{
                detailid=s.filter.troubleDetail.id;
            }catch(e){}
            try{
                modelid=s.filter.brandModel.id;
            }catch(e){}
            try{
                offergoal=s.filter.source.id;
            }catch(e){}
            autoResource.loadQuote({
                detailid:detailid,
                modelid:modelid,
                offergoal:offergoal
            }).success(function(d){
                s.quotes=d.data.data;
                console.log(d);
                s.tips.btn="查询";
                s.tips.lastT=new Date();
            });
        }
        
        function ok(scope){
            var quote=scope.quote;
            console.log(quote);
            $http.post('api/price/modifyPrice',quote).success(function(d){
                console.log(d)
                if(d.code=="200"){
                    quote.orignQupte=quote.price;
                }else{
                    alert(d.msg)
                }
            })
        } 
        function reset(scope){
            var quote=scope.quote;
            quote.price=quote.orignQupte;
        } 
        s.tbodyClick=function(e){
            var act;
            try{
                act=e.target.attributes.act;
            }catch(e){console.log(e)}
            if(act){
                var tr=angular.element(e.target).parent().parent();
                var scope=tr.scope();
                var fun={
                    ok:ok,
                    reset:reset
                    }[act.value]
                fun(scope);
            }else{
                return;
            }
        }
}]);