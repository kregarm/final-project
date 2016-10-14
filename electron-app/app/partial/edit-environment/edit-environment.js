angular.module('app').controller('EditEnvironmentCtrl',function($scope, projectService){

    $scope.environment = projectService.model.environment;




});
