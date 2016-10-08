angular.module('app').controller('HeaderCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;

});
