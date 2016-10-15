angular.module('app').controller('TestRunCtrl',function($scope, projectService){

    $scope.testRun = projectService.model.testRun;

    console.log($scope.testRun);
});
