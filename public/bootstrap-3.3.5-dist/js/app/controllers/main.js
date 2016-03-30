routeApp.controller('navbar', function ($rootScope, $scope, $http, $location, Current) {
    $scope.isTrigger = false;
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
    $scope.showTestWarning = function () {
        $('#warningModal').modal('show');
    };
    $scope.jumpTo = function (address) {
        $scope.targetAddr = address;
        if (!$scope.isTrigger) {
            $location.path(address);
        } else {
            $scope.showTestWarning();
        }
    };
    $scope.setupCurrentGroup = function (index) {
        if (!$scope.isTrigger) {
            Current.currentGroup = index;
            $rootScope.$broadcast('currentGroupChanged');
        } else {
             $('#alertModal').modal('show');
        }
    };
    $scope.getCurrentGroup = function () {
        return Current.currentGroup;
    };
    $scope.switchToTrigger = function () {
        $scope.isTrigger = !$scope.isTrigger;
    };
    $scope.sureOut = function () {
        $('#warningModal').modal('hide');
        $scope.switchToTrigger();
        $rootScope.$broadcast('testEnd');
        $location.path($scope.targetAddr);
    };
    $rootScope.$on('testChange', function () {
        $scope.switchToTrigger();
    });
});

routeApp.controller('ListAll', function ($scope, $http) {
    $scope.isInit = false;
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
        $scope.isInit = false;
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

routeApp.controller('EtcTest', function ($rootScope, $scope, $http, Current) {
    $scope.start = false;
    $scope.score = 0;
    $scope.userAnswer = "";
    $scope.getOneQuestion = function () {
        $http.get('group-etc-test?group=' + Current.currentGroup).then(function (response) {
            $scope.question = response.data;
            if ($scope.status = 'finished') {

            }
        });
    };
    $scope.startTest = function () {
        $http.get('end-test?type=etc_start').then(function (response) { // for god sake someone refresh the browser
            $scope.start = true;
            $scope.score = 0;
            $rootScope.$broadcast('testChange');
            $scope.getOneQuestion();
        });
    };
    $scope.getOneQuestionAndJudge = function () {
        if ($scope.userAnswer === $scope.question.answer) {
            $scope.score ++;
        }
        $scope.getOneQuestion();
    };
    $scope.finishTest = function () {
        $http.get('end-test?type=etc_start').then(function (response) {
            $scope.start = false;
            $scope.score = 0;
            $scope.userAnswer = "";
            $rootScope.$broadcast('testChange');
            $('#finishModal').modal('hide');
        });
    };
    $scope.finishTestByHand = function () {
        $('#finishModal').modal('show');
    };
    $rootScope.$on('testEnd', function () {
        if ($scope.start == true) {
            $http.get('end-test?type=etc_start').then(function (response) {
                $scope.start = false;
            });
        }
    });
});