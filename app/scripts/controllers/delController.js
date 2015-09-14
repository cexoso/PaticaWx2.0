'use strict';
angular.module('controller')
  .controller('delController', ['$scope','$modalInstance',function (s,$modalInstance) {
        s.ok = function () {
            $modalInstance.close("ok");
        };
        s.cancel = function () {
           $modalInstance.dismiss('cancel');
        };
}]);