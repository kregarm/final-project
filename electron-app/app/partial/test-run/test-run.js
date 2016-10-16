angular.module('app').controller('TestRunCtrl',function($scope, projectService){

    var testRun = projectService.model.testRun;
    $scope.project = projectService.model.item;

    for(var i = 0; i < testRun.length; i++){
        $scope.testRun = testRun[i];
    }

    $scope.updateTestCase = function (testCaseId, Status) {

        var updatedCase = {
            'status': Status,
            'testRunId': $scope.testRun._id
        };

        projectService.updateTestCaseWithinRun(testCaseId, $scope.testRun._id, updatedCase)
            .then(function(res){

                console.log(res.data);

                $scope.testRun = res.data;

            })
            .catch(function(err){
                console.log(err);
            });
    };


});
