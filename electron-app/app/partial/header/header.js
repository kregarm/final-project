angular.module('app').controller('HeaderCtrl',function($scope, projectService, $state){

    $scope.project = projectService.model.item;
    $scope.title = {};

    if($state.current.name ===  'list.projects' || $state.current.name ===  'list.new-project') {
        $scope.title.name = '';
    } else {
        $scope.title.name = $scope.project.projectName;
    }

});
