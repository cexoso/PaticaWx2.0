'use strict';
angular.module('services').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
}).filter('orderTypeParse', function () {
  return function (t) {
    var map = {
      '1': '上门维修',
      '2': '邮寄维修'
    }
    return map[t];
  }
}).filter('ordersourceParse', function () {
  return function (t) {
    if (!t) {
      return '正常下单';
    }
    var map = {
      'tengxun': '腾讯',
      'taofuli': '淘福利'
    }
    return map[t];
  }
}).filter('payStatusParse', function () {
  return function (t) {
    var map = {
      '0': '未支付',
      '1': '已支付'
    }
    return map[t];
  }
}).filter('statusParse', function () {
  return function (t) {
    var map = {
      '101': '订单已提交',
      '102': '维修工程师确认',
      '103': '确认支付',
      '104': '用户评价',
      '105': '订单结束',
      '200': '订单取消'
    }
    return map[t];
  }
}).filter('userRepairDateParse', function () {
  return function (t) {
    var d = new Date(t * 1000);
    return d.getYear() + 1900 + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
}).constant('status',[
      {id:'101',name:'订单已提交'},
      {id:'102',name:'维修工程师确认'},
      {id:'103',name:'确认支付'},
      {id:'104',name:'用户评价'},
      {id:'105',name:'订单结束'},
      {id:'200',name:'订单取消'}
]).constant('city', {
  citys: [
    {
      cityName: '北京',
      id: '1'
    },
    {
      cityName: '上海',
      id: '2'
    },
    {
      cityName: '广州',
      id: '3'
    },
    {
      cityName: '深圳',
      id: '4'
    },
    {
      cityName: '东莞',
      id: '5'
    },
    {
      cityName: '厦门',
      id: '6'
    },
    {
      cityName: '龙岩',
      id: '7'
    }
  ],
  regions: [
    {
      id: '10001',
      region: '朝阳区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10002',
      region: '海淀区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10003',
      region: '西城区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10004',
      region: '东城区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10005',
      region: '崇文区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10006',
      region: '宣武区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10007',
      region: '丰台区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10008',
      region: '石景山区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10009',
      region: '门头沟',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10010',
      region: '房山区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10011',
      region: '大兴区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10012',
      region: '顺义区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10013',
      region: '怀柔区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10014',
      region: '密云区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10015',
      region: '昌平区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10016',
      region: '平谷区',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '10017',
      region: '延庆县',
      parentid: '1',
      parentName: '北京'
    },
    {
      id: '20001',
      region: '黄浦区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20002',
      region: '徐汇区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20003',
      region: '长宁区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20004',
      region: '静安区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20005',
      region: '闸北区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20006',
      region: '虹口区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20007',
      region: '杨浦区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20008',
      region: '宝山区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20009',
      region: '闵行区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20010',
      region: '嘉定区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20011',
      region: '浦东新区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20012',
      region: '青浦区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20014',
      region: '普陀区',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '20015',
      region: '崇明县',
      parentid: '2',
      parentName: '上海'
    },
    {
      id: '30001',
      region: '天河区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30002',
      region: '海珠区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30003',
      region: '荔湾区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30004',
      region: '越秀区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30005',
      region: '番禺区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30006',
      region: '花都区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30007',
      region: '萝岗区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30008',
      region: '白云区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30009',
      region: '南沙区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30010',
      region: '黄浦区',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '30011',
      region: '广州大学城',
      parentid: '3',
      parentName: '广州'
    },
    {
      id: '40001',
      region: '南山区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40002',
      region: '罗湖区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40003',
      region: '福田区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40004',
      region: '宝安区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40005',
      region: '龙华新区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40006',
      region: '坂田片区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40007',
      region: '大运片区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40008',
      region: '布吉片区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40009',
      region: '龙岗区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '40010',
      region: '横岗片区',
      parentid: '4',
      parentName: '深圳'
    },
    {
      id: '50001',
      region: '寮步镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50002',
      region: '莞城区',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50003',
      region: '道滘镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50004',
      region: '沙田镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50005',
      region: '高埗镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50006',
      region: '石龙镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50007',
      region: '东城区',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50008',
      region: '茶山镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50009',
      region: '石碣镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50010',
      region: '松山湖',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50011',
      region: '厚街镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50012',
      region: '万江区',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50013',
      region: '南城区',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '50014',
      region: '长安镇',
      parentid: '5',
      parentName: '东莞'
    },
    {
      id: '60001',
      region: '思明区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '60002',
      region: '湖里区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '60003',
      region: '翔安区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '60004',
      region: '海沧区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '60005',
      region: '集美区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '60006',
      region: '同安区',
      parentid: '6',
      parentName: '厦门'
    },
    {
      id: '70001',
      region: '新罗区',
      parentid: '7',
      parentName: '龙岩'
    }
  ]
});
angular.module('services').service('confirm', [
  '$http',
  '$modal',
  function ($http, $modal) {
    return function (view) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'tpls/confirm.html',
        controller: [
          '$scope',
          '$modalInstance',
          function ($scope, $modalInstance) {
            $scope.view = view;
            $scope.ok = function () {
              $modalInstance.close('ok');
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        ],
        size: 'lg'
      });
      return modalInstance.result;
    }
  }
]);
angular.module('services').constant('source', [
  {
    name: '腾讯',
    id: 'tengxun'
  },
  {
    name: '淘福利',
    id: 'taofuli'
  }
]).constant('orderTypes', [
  {
    name: '上门维修',
    id: '1'
  },
  {
    name: '邮寄维修',
    id: '2'
  }
]);
angular.module('services').service('objParse', [
  function () {
    var N = (function () {
      var _this = {
      };
      function _next(o) {
        this.o = o;
      }
      function next(o) {
        if (arguments.length != 0) {
          _next.call(_this, o);
        } else {
          return _this.o;
        }
      }
      function reset() {
        _this = {
        };
        return true;
      }
      return {
        next: next,
        reset: reset
      }
    }) ();
    return function parseFun(obj, parse /*array*/
    ) {
      var robj=new obj.constructor();
      for (var o in obj) {
        var value = obj[o];
        if (value==='undefined') {
          continue;
        }
        var parsed;
        if (value.constructor.name == 'Object') {
          robj[o] = parseFun(value, parse);
          continue;
        }
        N.reset();
        for (var i = 0, length = parse.length; i < length; i++) {
          var p = parse[i];
          if (typeof p == 'function') {
            p(o,value, N.next);
            parsed = N.next();
            if (parsed != undefined) {
              robj[o] = parsed;
              break;
            }
          }
        }
        (robj[o]!==undefined )|| (robj[o] = value);
      }
      return robj;
    }
  }
]);
angular.module('services').service('author', [
  'user',
  '$location',
  '$q',
  '$injector',
  '$rootScope',
  function (user, $location, $q, $injector, $rootScope) {
    // console.log($rootScope);
    var interceptor = {
      'request': function (config) {
        var headers = config.headers;
        var author=user.get('author');
        headers.author = author;
        if(config.method=='GET'&&!author&&!config.url.match('login.html')){
          console.log('已拦截url'+config.url);
          $rootScope.$state.go('login.login');
          return $q.reject(config);
        }else{
          return config;
        }
      }
      // 'responseError': function (response) {
      //   if (response.status == 401) {
      //     $rootScope.$state.go('login.login');
      //     return $q.reject(response);
      //   }
      //   return response;
      // }
    };
    return interceptor;
  }
]);
angular.module('services').service('user', ['localstorage',
  function (localstorage) {
    var userInfo=localstorage.getItem('user')||
    {
      author: ''
    }
    function set(user){
      this.user=user;
      localstorage.setItem('user',user);
    }
    function get(key){
      return this.user[key];
    }
    var user={
      user:userInfo,
      set:set,
      get:get
    }
    return user;
  }
]).service('localstorage',[function(){
  if(!window.localStorage){
   console.error('浏览器不支持本地存储');
  }
  var map={};
  function setItem(key,value){
    value=JSON.stringify(value);
    map[key]=value;
    localStorage.setItem(key,value);
  }
  function getItem(key){
    var value=map[key]||localStorage.getItem(key);
    return JSON.parse(value);
  }
  return {
    setItem:setItem,
    getItem:getItem
  }
}]);
