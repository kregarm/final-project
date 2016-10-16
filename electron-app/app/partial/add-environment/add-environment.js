angular.module('app').controller('AddEnvironmentCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.projectEnvironment = {
        Project : $scope.project._id
    };

    $scope.saveEnvironment = function () {

        console.log($scope.projectEnvironment);

        projectService.createNewEnvironment($scope.projectEnvironment, $scope.project._id)
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
