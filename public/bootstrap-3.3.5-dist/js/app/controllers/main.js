routeApp.controller('navbar', function ($rootScope, $scope, $http, Current) {
    $scope.move = function (e) {
        $(e.currentTarget).addClass("active");
    };
    $scope.out = function (e) {
        $(e.currentTarget).removeClass("active");
    };
    $http.get('group-number').then(function (response) {
        $scope.groups = response.data.groups
        console.log(response.data)
    });
    $scope.setupCurrentGroup = function (index) {
        Current.currentGroup = index;
        $rootScope.$broadcast('currentGroupChanged');
    };
    $scope.getCurrentGroup = function () {
        return Current.currentGroup;
    };
});

routeApp.controller('ListAll', function ($scope, $http) {
    $scope.isInit = false;
    $scope.pageLimit = 10;
    $scope.currentPage = 1;
    $scope.getWordByIndex = function (index) {
        $http.get('all-word?index=' + index).then(function (response) {
            $scope.words = response.data.words;
            $scope.pages = response.data.pages;
            if (!$scope.isInit) {
                initPageUtil($scope);
                $scope.isInit = true;
            }
        });
    };
    $scope.updatePageItem = function (index) {
        $scope.getWordByIndex(index);
        $scope.pageContainer[$scope.currentPage] = false;
        $scope.pageContainer[index] = true;
        $scope.currentPage = index;
    };
    $scope.nextPage = function () {
        if ($scope.currentPage + 1 < $scope.pages) {
            $scope.updatePageItem($scope.currentPage + 1);
            if ($scope.endIndex + 1 <= $scope.pages) {
                $scope.startIndex ++;
                $scope.endIndex ++;
            }
        }
    };
    $scope.prePage = function () {
        if ($scope.currentPage - 1 > 0) {
            $scope.updatePageItem($scope.currentPage - 1);
            if ($scope.startIndex - 1 >= 0) {
                $scope.startIndex --;
                $scope.endIndex --;
            }
        }
    };
    $scope.getWordByIndex(1);
});

routeApp.controller('ListGroup', function ($rootScope, $scope, $http, Current) {
    $scope.isInit = false;
    $scope.pageLimit = 10;
    $scope.currentPage = 1;
    $scope.getWordByGroupAndPage = function (page, group) {
        $http.get('group-word?index=' + page + "&group=" + group).then(function (response) {
            $scope.words = response.data.words;
            $scope.pages = response.data.pages;
            if (!$scope.isInit) {
                initPageUtil($scope);
                $scope.isInit = true;
            }
        });
    };
    $rootScope.$on('currentGroupChanged', function () {
        $scope.getWordByGroupAndPage(1, Current.currentGroup);
    });
    $scope.updatePageItem = function (index) {
        $scope.getWordByGroupAndPage(index, Current.currentGroup);
        $scope.pageContainer[$scope.currentPage] = false;
        $scope.pageContainer[index] = true;
        $scope.currentPage = index;
    };
        $scope.nextPage = function () {
        if ($scope.currentPage + 1 <= $scope.pages) {
            $scope.updatePageItem($scope.currentPage + 1);
            if ($scope.endIndex + 1 < $scope.pages) {
                $scope.startIndex ++;
                $scope.endIndex ++;
            }
        }
    };
    $scope.prePage = function () {
        if ($scope.currentPage - 1 > 0) {
            $scope.updatePageItem($scope.currentPage - 1);
            if ($scope.startIndex - 1 >= 0) {
                $scope.startIndex --;
                $scope.endIndex --;
            }
        }
    };
    $scope.getWordByGroupAndPage(1, Current.currentGroup);
});