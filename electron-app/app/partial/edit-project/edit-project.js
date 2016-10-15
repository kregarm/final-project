angular.module('app').controller('EditProjectCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;

    $scope.updateProject = function () {

        projectService.updateProject($scope.project, $scope.project._id)
            .success(function () {

                $state.go('list.projects');

            }).error(function (err) {

            console.log(err);

        });
    };

});
