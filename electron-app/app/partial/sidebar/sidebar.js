angular.module('app').controller('SidebarCtrl',function($scope, projectService, authService, $state, $window){

    $scope.project = projectService.model.item;

    $scope.logoutClick = function(){

        authService.logout()
            .then(function(){
                $state.go('login');
            });

    };

    $scope.notification = function () {
        $window.alert('This feature has not yet been implemented');
    };

});
