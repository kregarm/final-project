angular.module('app').controller('NewProjectCtrl',function($scope, projectService, $state){

    $scope.project = {};

    $scope.createProject = function () {

        projectService.createProject($scope.project)
            .success(function () {

                $state.go('list.projects');

            }).error(function (err) {

            $scope.errors = [];

            for (var i in err) {

                $scope.errors.push(err[i].msg);
            }

        });
    };

});
