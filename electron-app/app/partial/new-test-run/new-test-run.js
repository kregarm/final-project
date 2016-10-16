angular.module('app').controller('NewTestRunCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.testGroups = projectService.model.testGroups;
    $scope.testRun = {};

    console.log($scope.testGroups);

    $scope.createTestRun = function () {

        var newTestRun = {
            'testRunName' :  $scope.testRun.testRunName,
            'projectId': $scope.project._id,
            testGroups : $scope.testGroups.selected
        };

        projectService.createTestRun(newTestRun)
            .success(function (res) {
                console.log(res._id);
                var newId = res._id;
                $state.go('app.test-run', {'projectId' : $scope.project._id, 'testRunId': newId } );
            }).error(function (res) {
                $scope.errors = [];

                for (var i in res) {

                    $scope.errors.push(res[i].msg);
                }
        });
    };
});
