var muniButlerApp = angular.module('muniButler', [
  'ngMap', 
  'ngResource', 
  'ngRoute', 
  'ui.router', 
  'ngMaterial',
  'ngCordova'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;

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
});

