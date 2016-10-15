angular.module('app').controller('ProjectTestingCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;
    $scope.testCases = projectService.model.testCases;
    $scope.testRuns = projectService.model.testRuns;
    $scope.testCase = {};


    console.log($scope.testRuns);
    $scope.testGroup = {
        Project: $scope.project._id
    };

    $scope.createGroup = function () {
        projectService.createTestGroup($scope.testGroup)
            .success(function () {
                $scope.testGroup.name = '';
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

        projectService.createTestCase($scope.testCase)
            .success(function () {
                $scope.testCase.testCaseName = '';
            }).error(function () {
                console.log('nay');
        });
    };

    $scope.deleteTestCase = function (testCaseId) {
        projectService.deleteTestCase(testCaseId);
    };

    $scope.deleteTestGroup = function (groupId) {
        projectService.deleteTestGroup(groupId);
    };

    $scope.updateGroup = function (data, id) {
        //console.log(data, id);
        projectService.updateTestGroup({name: data, id: id}, id);
    };

});
