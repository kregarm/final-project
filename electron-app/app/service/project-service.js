angular.module('app').factory('projectService',function($http) {

	var projectService = {
        model:{
            list: [],
            item: null,
            testGroups:[],
            testCases: []
        },
        createProject: function (data) {
            var promise = $http.post('http://localhost:3010/api/project', data);
            return promise;
        },
        getProjects: function (cb) {

            var promise = $http.get('http://localhost:3010/api/project');

            promise.then(function (res) {

                projectService.model.list = res.data;

                if (cb) {
                    cb();
                }

            });

            return promise;

        },
        deleteProject: function (id) {

            var promise = $http.delete('http://localhost:3010/api/project/' + id);

            promise.then(function (res) {

                angular.forEach(projectService.model.list, function (project, i) {

                    if (project._id === id) {

                        projectService.model.list.splice(i, 1);

                    }

                });

            });
            return promise;


        },
        getOne: function (id) {

            var promise = $http.get('http://localhost:3010/api/project/' + id);

            promise.then(function (res) {

                projectService.model.item = res.data;

            });

            return promise;

        },
        updateProject: function (data, id) {

            var promise = $http.put('http://localhost:3010/api/project/' + id, data);

            return promise;
        },
        createTestGroup: function (data) {
            var promise = $http.post('http://localhost:3010/api/test-group',  data);

            return promise;
        },
        getOneProjectEnv: function (id) {
            var promise = $http.get('http://localhost:3010/api/project-environment/' + id );

            promise.then(function (res) {

                projectService.model.item = res.data;

            });

            return promise;
        },
        getAllTestGroups: function (id) {

            var promise = $http.get('http://localhost:3010/api/test-group/' + id );

            promise.then(function (res) {

                projectService.model.testGroups = res.data;

            });

            return promise;
        },
        createTestCase: function (data) {

            var promise = $http.post('http://localhost:3010/api/test-case',  data);

            return promise;
        },
        getOneTestCase:function (id) {

            var promise = $http.get('http://localhost:3010/api/test-case/' + id);

            promise.then(function (res) {

                projectService.model.item = res.data;

            });

            return promise;
        },
        getCasesBasedOnGroups: function (id) {
            var promise = $http.get('http://localhost:3010/api/test-cases-group/' +  id);

            promise.then(function (res) {

            });
            return promise;
        },
        getCasesBasedOnProject: function (id) {

            var promise = $http.get('http://localhost:3010/api/test-cases-project/' +  id);

            promise.then(function (res) {
                projectService.model.testCases = res.data;
            });

            return promise;
        },
        deleteTestCase: function (id) {

            var promise = $http.delete('http://localhost:3010/api/test-case/' + id);

            promise.then(function (res) {

                angular.forEach(projectService.model.testCases, function (testCase, i) {

                    if (testCase._id === id) {

                        projectService.model.testCases.splice(i, 1);

                    }

                });

            });
            return promise;
        }
    };

	return projectService;
});
