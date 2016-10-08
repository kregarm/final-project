angular.module('app').controller('ProjectTestingCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;

    $scope.testGroup = {
        Project: $scope.project._id
    };

    $scope.createGroup = function () {
        console.log($scope.testGroup);
        projectService.createTestGroup($scope.testGroup)
            .success(function () {
                $scope.testGroup = {};
            }).error(function () {
                console.log('nay')
        })
    }

});
