angular.module('app').controller('ProjectDetailCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;

});
