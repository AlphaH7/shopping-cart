var app = angular.module('AM',['ngMaterial','ui.router','ngAnimate']);

app.config(function($stateProvider, $mdThemingProvider, $httpProvider, $urlRouterProvider){
    $httpProvider.interceptors.push(function(){
      var stack = 0, loader = jQuery('.loader');
      return{
        request: function(r){
          stack++;
          loader.show(0);
          return r;
        },
        response: function(r){ stack--; if(stack===0){ loader.hide(0); } return r;},
        requestError: function(r){ stack--; if(stack===0){ loader.hide(0); } return r;},
        responseError: function(r){ stack--; if(stack===0){ loader.hide(0); } return r;}/**/
      }
    });

    $stateProvider
    .state('app',{
      url:'/app',
      templateUrl: 'modules/app.html',
      //abstract: 'true'
    })
    .state('app.dashboard',{
      url:'/home',
      templateUrl: 'modules/home/home.html',
      controller: "homeCtrl"
    })
  ;$urlRouterProvider.when('','app/home');

  $mdThemingProvider.definePalette('AM', {
    '50': '#051a22',
    '100': '#082b38',
    '200': '#0c3c4e',
    '300': '#0f4e64',
    '400': '#125f7b',
    '500': '#167091',
    '600': '#1c92bd',
    '700': '#20a3d3',
    '800': '#2db0e0',
    '900': '#43b8e3',
    'A100': '#1c92bd',
    'A200': '#1981a7',
    'A400': '#167091',
    'A700': '#59c0e6',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', '200', '600', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('AM');

});
app.run(function($rootScope){

  $rootScope.result = localStorage.getItem('AM-cart') ? JSON.parse(localStorage.getItem('AM-cart')) : [];
  $rootScope.total = localStorage.getItem('AM-total') ? localStorage.getItem('AM-total') : 0;

});
app.controller('appCtrl',['$scope','$mdSidenav','$http','$mdDialog','$state',function(s,sNav,http,dialog,state){
  s.toggleMenu = function(){
    sNav('right').toggle();
  }

  s.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = dialog.prompt()
      .title('Hi! Welcome to Amaze-Me. ')
      .textContent('May I know your name')
      .placeholder('name')
      .ariaLabel('name')
      .initialValue('User')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel');

    dialog.show(confirm).then(function(r) {
      s.user = r;
    }, function() {
      s.showPrompt();
    });
  };
  s.showPrompt();

  s.cart = [];

  s.add = function(id,x,price){
    console.log(id + '/'+ price)
    s.cart.push({'name': x , 'price': price , 'id': id , 'quantity': 1});
    console.log(s.cart)
    var newObj = {};
    for(i in s.cart){
     var item = s.cart[i];
        if(newObj[item.name] === undefined){
            newObj[item.name] = 0;
        }
        newObj[item.name] += item.price;
    }
    console.log(newObj);
    s.result =[]
    for(i in newObj){
        s.result.push({'name':i,'price':newObj[i]});
    }
    console.log(s.result);
    s.totalPrice();
    localStorage.setItem('AM-cart', JSON.stringify(s.result));
    localStorage.setItem('AM-total',s.total);
  }
  s.totalPrice = function(){
            s.total = 0;
            for(count=0;count<s.result.length;count++){
                s.total += parseInt(s.result[count].price,10);
            }};
  s.remove = function(name){
  var index = -1;
  var comArr = eval( s.result );
  for( var i = 0; i < comArr.length; i++ ) {
        if( comArr[i].name === name ) {
            index = i;
            break;
         }
  }
  if( index === -1 ) {
       alert( "Something gone wrong" );
  }
  s.result.splice( index, 1 );
  console.log(s.result)
  s.totalPrice();
  localStorage.setItem('AM-cart', JSON.stringify(s.result));
  localStorage.setItem('AM-total',s.total);
  };
}]);
