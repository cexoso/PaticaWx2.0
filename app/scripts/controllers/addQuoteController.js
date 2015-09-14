'use strict';
angular.module('controller')
  .controller('addQuoteController', ['$scope','$resource','$modal',function (s,resource,$modal) {
        s.quoteList=[];
        s.addQuoteDtl=function(order){
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/addQuoteDtl.html',
                  controller: 'addQuoteDtlController'
             });
            modalInstance.result.then(function(q){
                s.quoteList.push(q);
            },function(w){
                console.log(w)
            });
        }
        s.submit=function(){
          alert('提交的数据为：'+JSON.stringify(s.quoteList))
        }
        s.addQuoteDtl();
}]);

angular.module('controller')
  .controller('addQuoteDtlController',['$scope','$modalInstance','resourceLoader',function(s,$modalInstance,resourceLoader){
        s.datas={};
        s.data={};
        s.ok = function () {
            $modalInstance.close(s.data);  
        };
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        }; 
        resourceLoader.loadBrand({
            producetype:'200001'
        }).success(function(d){
            if(d.code!=200){
              alert(d.msg)
            }            
            s.datas.brands=d.data.data;
            s.data.brand=s.datas.brands[0];
        });
        s.$watch('data.brand',function(n){
            if(!n) return;
            resourceLoader.loadBrandModel({
                brandid:n.id
            }).success(function(d){                
                s.datas.models=d.data.data;
                s.data.model=s.datas.models[0];     
            });
        });
    
        resourceLoader.loadTrouble().success(function(e){
            s.datas.faults=e.data.data;
            s.data.fault=s.datas.faults[0];
        });
        s.$watch('data.fault',function(n){
            if(!n) return;
            resourceLoader.loadTroubleDetail({
                troubleid:n.id
            }).success(function(e){                
                s.datas.subFaults=e.data.data;
                s.data.subFault=s.datas.subFaults[0];
            });
        });
}]);

