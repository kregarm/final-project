angular.module('app').controller('ProjectDetailCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.environments = projectService.model.environments;

    $scope.deleteEnvironment = function (envId) {
        projectService.deleteEnvironment(envId);
    }

});
