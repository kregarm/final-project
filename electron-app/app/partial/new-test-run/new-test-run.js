angular.module('app').controller('NewTestRunCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;
    $scope.testRun = {};

    console.log($scope.testGroups);

    $scope.createTestRun = function () {

        var newTestRun = {
            'testRunName' :  $scope.testRun.testRunName,
            testGroups : $scope.testGroups.selected
        };

        projectService.createTestRun(newTestRun)
            .success(function () {
                var run = projectService.model.testRun;
                console.log(run);
            });
    };
});
