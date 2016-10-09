angular.module('app').controller('ProjectTestingCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;

    $scope.testGroup = {
        Project: $scope.project._id
    };

    $scope.createGroup = function () {
        console.log($scope.testGroup);
        projectService.createTestGroup($scope.testGroup)
            .success(function () {
                $scope.testGroup.name = '';
                projectService.getAllTestGroups($scope.project._id)
                    .then(function () {
                        $scope.testGroups = projectService.model.testGroups;
                    });
            }).error(function () {
                console.log('nay');
        });
    };

});
