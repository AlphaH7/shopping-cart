angular.module('AM').controller('homeCtrl',['$scope','$http','$mdToast','$state',function(s,http,toast,state){

  http.get('products.json').then(
    function(r){
      s.items = r.data;
    }
  );
}]);
