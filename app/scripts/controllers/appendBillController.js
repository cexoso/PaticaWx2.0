'use strict';
angular.module('controller')
  .controller('appendBillController',['$scope','$modalInstance','$http','city','source','orderTypes','resourceLoader','objParse','status',function(s,$modalInstance,$http,city,source,orderTypes,resourceLoader,objParse,status){
        s.sources=source;
        s.orderTypes=orderTypes;
        s.user_citys=city.citys;
        s.statuss=status;
        s.colors=[
            {name:'金色',id:'1'},
            {name:'灰色',id:'2'},
            {name:'白色',id:'3'},
            {name:'黑色',id:'4'}
        ];
        s.oi={
            ordertime:new Date(),
            user_repair_date:new Date(),
            colorName:s.colors[0].name,
            user_city:s.user_citys[0].cityName
        };
        
        resourceLoader.loadBrand({
            producetype:'200001'
        }).success(function(d){
            s.brands=d.data.data;
            s.oi.brand=s.brands[0].id;
        });
        resourceLoader.loadTrouble().success(function(e){
            s.troubles=e.data.data;
            s.oi.trouble_type=s.troubles[0].id;
        });
        
        s.$watch("oi.brand",function(n){
            if(!n){
                return;
            }
            resourceLoader.loadBrandModel({
                brandid:n
            }).success(function(e){      
                s.brandModels=e.data.data;
                s.oi.brand_model=s.brandModels[0].id;
            });
        });
        s.$watch("oi.trouble_type",function(n){
            if(!n){
                return;
            }
            resourceLoader.loadTroubleDetail({
                troubleid:n
            }).success(function(e){
                s.troubleDetails=e.data.data;
                s.oi.trouble_type_detail=s.troubleDetails[0].id;
            });
        });
        s.$watch("oi.user_city",function(n){
            if(!n){
                return;
            }
            s.user_areas=city.regions.filter(function(item){
                if(item.parentName==n){
                    return true;    
                }else{
                    return false;
                }
            });
            s.oi.user_area=s.user_areas[0].region;
        });
        s.data={};
       
        
        s.ok = function () {
            var params=objParse(s.oi,[function(key,o,next){
                if(o instanceof Date){                    
                    next(new Date(o).getTime());
                }  
            }]);
            $http.post('api/order/addOrder',params).success(function(d){
                if(d.code!=200){
                    alert(d.msg);
                }else{
                    alert('订单提交成功');
                    $modalInstance.close("success");    
                }
            }).error(function(){
                alert("提交失败");
            });
        };
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        }; 
}]);

angular.module('controller')
  .controller('appendBillFormController',['$scope','$http',function($scope,$http){
    $scope.open = function($event) {
        $scope.status.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        currentText:'今天'
    };
    $scope.status = {
        opened: false
    };
    $scope.ondoor_open = function($event) {
        $scope.status.ondoor_opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        currentText:'今天'
    };
    $scope.status = {
        ondoor_opened: false
    };
}]);

