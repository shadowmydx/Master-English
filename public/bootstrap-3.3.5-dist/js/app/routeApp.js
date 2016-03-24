var routeApp = angular.module('routeApp',['ngRoute']);
routeApp.config(function ($routeProvider) {
      $routeProvider
      .when('/list-all', {
            templateUrl: '../static/js/app/views/list.html',
            controller: 'ListAll'
      })
      .when('/list/:id', {
            templateUrl: '../static/js/app/views/list.html',
            controller: 'ListGroup'
      })
      .otherwise({
            templateUrl: '../static/js/app/views/home.html',
      });
});