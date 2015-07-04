var muniButlerApp = angular.module('muniButler', [
  'ngMap', 
  'ngResource', 
  'ngRoute', 
  'ui.router', 
  'ngMaterial',
  'ngCordova',
  'd3'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $httpProvider.defaults.withCredentials = true;

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      templateUrl: 'views/home.html',
      // controller: 'HomeController'
    })
    .state('home.form', {
      // url: '/form',
      url: '',
      templateUrl:'templates/form.html',
      controller: 'HomeController'
    })
    .state('home.display', {
      url: '/routes',
      templateUrl: 'views/routes.html',
      controller: 'RoutesController'
    })
    .state('/login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: ''
    });
})
.run(function ($rootScope) {
  $rootScope.serverUrl = 'https://6ba84954.ngrok.com';
})
// for d3 visualization
.directive('changeColor', ['d3Service', function(d3Service) {
  return {
    restrict: 'E',

    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var green = "#00ff00";
        var yellow = "#ffff00";
        var red = "#ff0000";

        //unique $index for each repeat

        var colorScale = d3.scale.linear()
          .domain([0, 20, 40])
          .range([green, yellow, red]);

        d3.selectAll('.duration')
          .each(function(d, i){

            var minutes = this.textContent.split(' ')[0];
            console.log('SCOPE: ', scope);
            d3.select(this)
              .style('color', colorScale(minutes));
          });
          // .style('color', colorScale(minutes)); 
        
      });  
    }}
}]);

