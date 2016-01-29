angular.module('mathsApp').controller('TheoryPageCtrl', ['$scope', '$log',
  function($scope, $log) {
    $scope.totalItems = 12;
    $scope.currentPage = 1;
    $scope.path = 'http://192.168.1.87:3000/content/Fractions/ADDING-FRACTIONS-FRACTIONS-PG01.html';
    LucyAlex.TheoryPage.Loader.load();
 
    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.debug('Page changed to: ' + $scope.currentPage);
      $scope.path = 'http://192.168.1.87:3000/content/Fractions/ADDING-FRACTIONS-FRACTIONS-PG01.html';
    };

    // $scope.maxSize = 5;
    // $scope.bigTotalItems = 175;
    // $scope.bigCurrentPage = 1;
  }
]);