angular.module('app').controller('ListSidebarCtrl',function($scope, authService, $state){

    $scope.logoutClick = function(){

        authService.logout()
            .then(function(){
                $state.go('login');
            });

    };

});
