angular.module('app').factory('requestInterceptorService',function(dataService) {

    return {
        request: function($config){

            $config.headers.authorization = dataService.model.user.token;
            return $config;

        }
    };
});
