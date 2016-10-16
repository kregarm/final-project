angular.module('app').factory('dataService',function() {

    var dataService = {
        model:{
            user:{
                token:null
            },
            userPermissions:[],
            items:[],
            users:[]
        }
    };

    return dataService;
});
