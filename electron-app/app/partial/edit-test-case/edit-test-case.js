angular.module('app').controller('EditTestCaseCtrl',function($scope, projectService, $state){

    $scope.testCase = projectService.model.testCase;
    $scope.project = projectService.model.item;


    $scope.updateTestCase = function () {
        projectService.updateTestCase($scope.testCase._id, $scope.testCase)
            .success(function () {
                $state.go('app.project-testing', {'projectId':$scope.project._id });
            });
    };

});
