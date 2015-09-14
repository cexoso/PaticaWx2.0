'use strict';
angular.module('controller')
  .controller('evaluationController', ['$scope','order','$modalInstance',function (s,order,$modalInstance) {
        s.order=order;
        s.ok = function () {
            $modalInstance.close("hello");
        };
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        };
}]);