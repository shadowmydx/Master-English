function initPageUtil($scope) {
    $scope.pageLimit = 10;
    $scope.currentPage = 1;
    $scope.pageContainer = new Array($scope.pages);
    for (var i = 0; i < $scope.pageContainer.length; i ++) {
        $scope.pageContainer[i] = false;
    }
    $scope.pageContainer[1] = true;
    $scope.startIndex = 0;
    $scope.endIndex = $scope.pageLimit - 1;
}

function getShowPagesRange(from, all, limited) {
    var result = {};
    var to = from + limited - 1;
    var isOverflow = (to >= all);
    if (isOverflow) {
        result[start] = all - limited;
        result[end] = all - 1;
    } else {
        result[start] = from;
        result[end] = to;
    }
    return result;
}
