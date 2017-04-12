var app = angular.module('AM',['ngMaterial','ui.router','ngMask','ngAnimate']);

app.config(function($stateProvider, $mdThemingProvider, $httpProvider){
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
      url:'/dashboard',
      templateUrl: 'modules/home/home.html',
      controller: "homeCtrl"

    })
  ;

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
app.controller('appCtrl',['$scope','$mdSidenav','$http','$mdDialog','$state',function(s,sNav,http,dialog,state){
  s.toggleMenu = function(){
    sNav('right').toggle();
  }

  s.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = dialog.prompt()
      .title('Hi! welcome to AM. ')
      .textContent('May I know your name')
      .placeholder('name')
      .ariaLabel('name')
      .initialValue('User')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel');

    dialog.show(confirm).then(function(result) {
      s.user = result;
    }, function() {
      s.showPrompt();
    });
  };
  s.showPrompt();
  s.cart=[];

  s.add = function(id,x,price){
    console.log(id + '/'+ price)
    s.cart.push({'name': x , 'price': price , id: 'id'});
    console.log(s.cart)
  }
}]);

/*app.run(function($rootScope, $state){
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if( ['login','forgot_password'].indexOf(toState.name) === -1 && !localStorage.getItem('alist_auth_token')){
            e.preventDefault();
            $state.go('login');
        }
    });
});
*/
