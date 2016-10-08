angular.module('app').controller('ProjectTestingCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;

    $scope.testGroup = {
        project: $scope.project._id
    };

    $scope.createGroup = function () {
        console.log($scope.testGroup);
        projectService.createTestGroup($scope.testGroup)
            .success(function () {
                console.log('yay')
            }).error(function () {
                console.log('nay')
        })
    }

});
