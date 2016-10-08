angular.module('app').controller('AddEnvironmentCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.project.projectEnvironments = {};

    $scope.saveEnvironment = function () {

        projectService.updateProject($scope.project.projectEnvironments, $scope.project._id)
            .success(function () {
                $state.go('app.project-detail', {'projectId' : $scope.project._id} );
            }).error(function (res) {
            console.log(res);
        });

    };


});
