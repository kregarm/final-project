angular.module('app').controller('LoginCtrl',function($scope, authService, $state){

    $scope.user = {
        email:null,
        password:null
    };
    
    $scope.loginClick = function(){

        authService.login($scope.user)
            .then(function(){
                $state.go('list.projects');
            });

    };

});
