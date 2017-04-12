angular.module('AM').controller('homeCtrl',['$scope','$http','$mdToast',function(s,http,toast){

  http.get('products.json').then(
    function(r){
      s.items = r.data;
    }
  );
}]);
