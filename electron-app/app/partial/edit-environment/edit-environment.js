angular.module('app').controller('EditEnvironmentCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.environment = projectService.model.environment;

    $scope.updateEnvironment = function () {
        projectService.updateEnvironment($scope.environment, $scope.environment._id)
            .success(function () {
                $state.go('app.project-detail', {'projectId' : $scope.project._id} );
            }).error(function (res) {
            $scope.errors = [];

            for (var i in res) {
                $scope.errors.push(res[i].msg);
            }
        });
    };




});
