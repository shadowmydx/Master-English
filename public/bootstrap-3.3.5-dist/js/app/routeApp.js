var routeApp = angular.module('routeApp',['ngRoute']);
routeApp.config(function ($routeProvider) {
      $routeProvider
      .when('/list-all', {
            templateUrl: '../static/js/app/views/list.html',
            controller: 'ListAll'
      })
      .when('/list', {
            templateUrl: '../static/js/app/views/list.html',
            controller: 'ListGroup'
      })
      .otherwise({
            templateUrl: '../static/js/app/views/home.html',
      });
});
routeApp.factory('Current', function() {
    return {
        currentGroup : 1
    };
});
routeApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});