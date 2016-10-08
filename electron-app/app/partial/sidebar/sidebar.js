angular.module('app').controller('SidebarCtrl',function($scope, projectService){

    $scope.project = projectService.model.item;
    
});
