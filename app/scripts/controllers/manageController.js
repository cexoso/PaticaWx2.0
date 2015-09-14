'use strict';
angular.module('controller')
  .controller('manageController', ['$scope','$modal','$http','manageFiltersLinkage','city','resourceLoader','$filter','objParse',function (s,$modal,$http,manageFiltersLinkage,city,resourceLoader,$filter,objParse) {
        var config={
          pagesize:10
        };
        var now=new Date;
        s.filter={
          endtime:now,
          starttime:new Date(now.getFullYear(),now.getMonth(),now.getDate()-3)
        };
        s.page={};
        manageFiltersLinkage(s);
        s.filters={
          citys:city.citys,
          payStatus:[
            {name:'未支付',id:'0'},
            {name:'已支付',id:'1'}
          ],
          ordersources:[
            {name:'腾讯',id:'tengxun'},
            {name:'淘福利',id:'taofuli'}
          ]
        };
        s.tips={
          btn:"查询"
        };
        
        (function(){
          resourceLoader.loadBrand({
            producetype:'200001'
          }).success(function(d){
            if(d.code!=200){
              //alert(d.msg)
            }
            s.filters.brands=d.data.data;
          })
          s.$watch('filter.brand',function(n){
            if(!n){
              s.filters.versions=null;
              return;
            }
            resourceLoader.loadBrandModel({
                brandid:n.id
            }).success(function(e){
                s.filters.versions=e.data.data;                
            });
          });
        })();
        
        var loadData=(function(){
            return function (o){
                $http.post('api/order/getOrderByParam',o)
                .success(function(d){
                    if(d.code!=200){
                      //alert(d.msg);
                      return;
                    }
                    s.page={
                      totalcount:d.data.totle,
                      page:d.data.index,
                      pagesize:d.data.size,
                      orders:d.data.data
                    }
                    s.page.numPages = Math.floor(s.page.totalcount/s.page.pagesize)+1;    
                });
            }
        })();
        s.del=function(order){
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/del.html',
                  controller: 'delController',
                  size: 'sm'
                  //,backdrop:false
             });
            modalInstance.result.then(function(ok){
                (function(order){
                    //$http
                    var orders=s.page.orders;
                    for(var i=0;i<orders.length;i++){
                        if(orders[i].id==order.id){
                            orders.splice(i,1);
                            break;
                        }
                    }
                })(order)
            },function(msg){
            });
        }
        var load=function(to){
          var f=s.filter,
          o=objParse(f,[function(key,o,next){
            if(o instanceof Date){
              next($filter('date')(o,'yyyy-MM-dd'));
            }            
          },function(key,o,next){
            // if(o==engineer){
            //   next($filter('date')(o,'yyyy-MM-dd'));
            // }  
          }]);
          loadData(angular.extend({
            page:{
              size:config.pagesize,
              index:to||s.page.page||1
            }
          },o));
        };
        s.pageChanged=load;
        s.query=load;
        s.query();
         // s.$on('a',function(a){
         
         // })
         
         s.assign=function(order){
            function addTask(order,engineer){
              $http.post('api/order/addTask',{
                orderid:order.orderid,
                userid:engineer.id,
                status:0
              }).success(function(d){
                if(d.code!=200){
                  alert(d.msg)
                }else{
                  $http.post('api/order/updateOrder',{
                    status:102,
                    orderid:order.orderid
                  }).success(function(d){
                    if(d.code!=200){
                      alert(d.msg)
                    }else{
                        console.log(d.data.data[0])
                        angular.extend(order,d.data.data[0]);
                    }
                  });
                }
              });
            }
            function updateTask(order,engineer){
              $http.post('api/order/updateTask',{
                orderid:order.orderid,
                userid:engineer.id,
              }).success(function(d){
                if(d.code!=200){
                  alert(d.msg)
                }else{
                  $http.post('api/order/getOrderByParam',{
                    orderid:order.orderid
                  }).success(function(d){
                    if(d.code!=200){
                      alert(d.msg)
                    }else{
                        angular.extend(order,d.data.data[0]);
                    }
                  });
                }
              });
            }
            
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/engineer.html',
                  controller: 'engineerController',
                  size: 'sm',
                  backdrop:true
             });
            modalInstance.result.then(function(engineer){
                  if(order.engineerid){
                    updateTask(order,engineer);
                  }else{
                    addTask(order,engineer);
                  }
            },function(error){
            });
        }
}]);

angular.module('services').service('manageFiltersLinkage',['$http','city',function($http,city){
  return function(scope){
    scope.$watch('filter.city',function(n){
      if(!n){
        scope.filters.areas=null;  
        return;
      }
      scope.filters.areas=city.regions.filter(function(item){
        if(item.parentid==n.id){
          return true;
        }else{
          return false;
        }
      })
    });
  }
}]);


angular.module('controller')
  .controller('funCtroller',['$scope','$modal',function(s,$modal){
    // s.$emit('a',{a:123});
    s.appendBill=function(order){
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/appendBill.html',
                  controller: 'appendBillController',
                  size: 'lg',
                  backdrop:false
             });
            modalInstance.result.then(function(q){
                console.log(q);
            },function(w){
                
            });
        }

    s.appendPeople=function(order){
            var modalInstance = $modal.open({
                  animation: true,
                  templateUrl: 'views/appendPeople.html',
                  controller: 'appendPeopleController',
                  size: 'lg',
                  backdrop:false
             });
            modalInstance.result.then(function(q){
                
            },function(w){
                
            });
        }
}]);


angular.module('controller').controller('DatepickerDemoCtrl', ['$scope',function ($scope) {
  $scope.startOpen = function($event) {
    $scope.status.startOpened = true;
  };
  $scope.endOpen = function($event) {
    $scope.status.endOpened = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    currentText:'今天'
  };
  $scope.status = {
    startOpened: false,
    endOpened: false
  };
}]);