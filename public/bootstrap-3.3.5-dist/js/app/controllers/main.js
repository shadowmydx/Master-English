routeApp.controller('navbar', function ($scope) {
    $scope.move = function (e) {
        $(e.currentTarget).addClass("active");
    };
    $scope.out = function (e) {
        $(e.currentTarget).removeClass("active");
    };
});

routeApp.controller('ListAll', function ($scope) {

});

routeApp.controller('ListGroup', function ($scope) {

});