angular.module('app').factory('authService',function($timeout, $rootScope, $http, dataService, $localForage, $state) {

    var authService = {
        isLoggedIn: function () {

            return authService.getToken()
                .then(function () {
                    return $http.post('http://localhost:3010/api/account/checkLogin')
                        .then(function (res) {
                            console.log('haha');
                            dataService.model.loggedIn = true;
                            dataService.model.userPermissions = res.data;
                            $rootScope.isLoggedIn = true;
                            return res.data;

                        })
                        .catch(function(err){
                            console.log('Error: ',err);
                            $state.go('login', null, {reload:true});
                        });

                });


        },
        login: function (userData) {

            console.log(userData);

            return $http.post('http://localhost:3010/api/account/login', userData)
                .then(function (res) {

                    $rootScope.isLoggedIn = true;
                    return authService.setToken(res.data);

                })
                .catch(function (err) {

                    console.log(err);
                    return err;

                });

        },
        setToken: function (userData) {

            return $localForage.setItem('user', userData)
                .then(function (userData) {

                    console.log(userData);

                    dataService.model.user = userData;
                    return userData;

                });

        },
        getToken: function () {

            return $localForage.getItem('user')
                .then(function (userData) {
                    if (userData) {
                        dataService.model.user = userData;
                        return userData;
                    } else {
                        return null;
                    }

                });

        },
        logout: function () {

            return $http.get('http://localhost:3010/api/account/logout')
                .then(function () {
                    return $localForage.clear();
                });

        },
        forgotten: function (email) {

            return $http.post('http://localhost:3010/api/account/forgotten', {email: email})
                .then(function (res) {

                    return res.data;

                });

        },
        confirmReset: function (key, password) {

            return $http.post('http://localhost:3010/api/account/reset-password', {key: key, password: password})
                .then(function (res) {
                    return res.data;
                });

        }
    };

    return authService;
});
