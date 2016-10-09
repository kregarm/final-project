angular.module('app').controller('AddEnvironmentCtrl',function($scope, projectService, $state, uuid){

    $scope.project = projectService.model.item;
    $scope.project.projectEnvironments = {
        'id': uuid.v4()
    };

    $scope.saveEnvironment = function () {

        console.log($scope.project.projectEnvironments);

        projectService.updateProject($scope.project.projectEnvironments, $scope.project._id)
            .success(function () {
                $state.go('app.project-detail', {'projectId' : $scope.project._id} );
            }).error(function (res) {
            console.log(res);
        });

    };


});
