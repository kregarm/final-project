angular.module('app').controller('EditEnvironmentCtrl',function($scope, projectService){

    $scope.projectEnvironments = projectService.model.item;
    

});
