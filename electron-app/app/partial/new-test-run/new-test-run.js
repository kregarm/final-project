angular.module('app').controller('NewTestRunCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;

});
