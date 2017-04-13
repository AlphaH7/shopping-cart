angular.module('AM').controller('homeCtrl',['$scope','$http','$mdToast',function(s,http,toast){

  http.get('products.json').then(
    function(r){
      s.items = r.data;
    }
  );
  s.sort = function(keyname){
    s.sortKey = keyname;   //set the sortKey to the param passed
    s.reverse = !s.reverse; //if true make it false and vice versa
  }
}]);
