angular.module('app').controller('TestRunCtrl',function($scope, projectService){

    var testRun = projectService.model.testRun;

    for(var i = 0; i < testRun.length; i++){
        $scope.testRun = testRun[i];
        console.log($scope.testRun);
    }


});
