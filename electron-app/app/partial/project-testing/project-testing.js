angular.module('app').controller('ProjectTestingCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;
    $scope.testCases = projectService.model.testCases;
    $scope.testCase = {};

    $scope.testGroup = {
        Project: $scope.project._id
    };

    $scope.createGroup = function () {
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

    $scope.createTestCase = function (testGroupId) {
        $scope.testCase = {
            testCaseName: $scope.testCase.testCaseName,
            testGroup   : testGroupId,
            Project     : $scope.project._id
        };

        console.log($scope.testCase);

        projectService.createTestCase($scope.testCase)
            .success(function () {
                projectService.getCasesBasedOnProject($scope.project._id)
                    .then(function () {
                        $scope.testCases = projectService.model.testCases;
                    });
            }).error(function () {
                console.log('nay');
        });
    };

    $scope.deleteTestCase = function (testCaseId) {
        projectService.deleteTestCase(testCaseId);
    };

});
