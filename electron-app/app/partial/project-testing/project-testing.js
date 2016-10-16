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
                $scope.errors = [];
            }).error(function (res) {
                $scope.errors = [];

                for (var i in res) {

                    $scope.errors.push(res[i].msg);
                }
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
            }).error(function (res) {
                $scope.errors2 = [];

                for (var j in res) {

                    $scope.errors2.push(res[j].msg);
                }
        });
    };

    $scope.deleteTestCase = function (testCaseId) {
        projectService.deleteTestCase(testCaseId);
    };

    $scope.deleteTestGroup = function (groupId) {
        projectService.deleteTestGroup(groupId);
    };

    $scope.updateGroup = function (data, id) {
        projectService.updateTestGroup({name: data, id: id}, id)
            .success(function () {
                $scope.errors3 = [];
            })
            .error(function (res) {
                $scope.errors3 = [];

                for (var k in res) {

                    $scope.errors3.push(res[k].msg);
                };
            })
    };

});
