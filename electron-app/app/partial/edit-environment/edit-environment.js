angular.module('app').controller('EditEnvironmentCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.environment = projectService.model.environment;

    $scope.updateEnvironment = function () {
        projectService.updateEnvironment($scope.environment, $scope.environment._id)
            .success(function () {
                $state.go('app.project-detail', {'projectId' : $scope.project._id} );
            });
    };




});
