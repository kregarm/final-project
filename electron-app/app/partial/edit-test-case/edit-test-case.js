angular.module('app').controller('EditTestCaseCtrl',function($scope, projectService){

    $scope.testCase = projectService.model.item;

});
