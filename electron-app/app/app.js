angular.module('app', ['ui.bootstrap','ui.utils','ui.router','checklist-model', 'xeditable', 'ngSanitize', 'ui.tinymce']);

angular.module('app').constant('CONFIG',config);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
        abstract: true,
        views: {
            header:{
                templateUrl: 'partial/header/header.html',
                controller: 'HeaderCtrl'
            },
            sidebar:{
                templateUrl: 'partial/sidebar/sidebar.html',
                controller: 'SidebarCtrl'
            }
            //add login resolve
        }
    });

    $stateProvider.state('list', {
        abstract: true,
        views: {
            header:{
                templateUrl: 'partial/header/header.html',
                controller: 'HeaderCtrl'
            },
            sidebar:{
                templateUrl: 'partial/list-sidebar/list-sidebar.html',
                controller: 'ListSidebarCtrl'
            }
            //add login resolve
        }
    });


    $stateProvider.state('list.projects', {
        url: '/projects',
        views: {
            'main@': {
                templateUrl: 'partial/projects/projects.html',
                controller: 'ProjectsCtrl',
                resolve: {
                    project: function (projectService) {
                        return projectService.getProjects();

                    }
                }
            }
        }
    });
    $stateProvider.state('list.new-project', {
        url: '/new-project',
        views:{
            'main@':{
                templateUrl: 'partial/new-project/new-project.html',
                controller: 'NewProjectCtrl'
            }
        }
    });
    $stateProvider.state('app.project-detail', {
        url: '/:projectId/project-detail',
        views:{
            'main@':{
                templateUrl: 'partial/project-detail/project-detail.html',
                controller: 'ProjectDetailCtrl',
                resolve:{
                    project:function(projectService, $stateParams){
                        return projectService.getOne($stateParams.projectId),
                               projectService.getAllEnvironmentsBasedOnProject($stateParams.projectId);
                    }
                }
            }
        }
    });
    $stateProvider.state('app.add-environment', {
        url: '/:projectId/add-environment',
        views: {
            'main@': {
                templateUrl: 'partial/add-environment/add-environment.html',
                controller: 'AddEnvironmentCtrl',
                resolve: {
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId);
                    }
                }
            }
        }
    });
    $stateProvider.state('app.edit-environment', {
        url: '/:projectId/edit-environment/:envId',
        views:{
            'main@':{
                templateUrl: 'partial/edit-environment/edit-environment.html',
                controller: 'EditEnvironmentCtrl',
                resolve: {
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId),
                               projectService.getOneEnvironment($stateParams.envId);
                    }
                }
            }
        }
    });
    $stateProvider.state('app.project-testing', {
        url: '/:projectId/project-testing/',
        views:{
            'main@':{
                templateUrl: 'partial/project-testing/project-testing.html',
                controller: 'ProjectTestingCtrl',
                resolve: {
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId),
                               projectService.getAllTestGroups($stateParams.projectId),
                               projectService.getCasesBasedOnProject($stateParams.projectId);
                    },
                    testGroups: function(){
                        return projectService.getAllTestGroups($stateParams.projectId);
                    }
                }
            }
        }
    });
    $stateProvider.state('app.edit-test-case', {
        url: '/:projectId/edit-test-case/:testCaseId',
        views:{
            'main@':{
                templateUrl: 'partial/edit-test-case/edit-test-case.html',
                controller: 'EditTestCaseCtrl',
                resolve:{
                    testCase: function (projectService, $stateParams) {
                        return projectService.getOneTestCase($stateParams.testCaseId),
                               projectService.getOne($stateParams.projectId);
                    }
                }
            }
        }
    });
    $stateProvider.state('app.new-test-run', {
        url: '/:projectId/new-test-run',
        views:{
            'main@':{
                templateUrl: 'partial/new-test-run/new-test-run.html',
                controller: 'NewTestRunCtrl',
                resolve:{
                    project: function (projectService, $stateParams) {
                           return projectService.getOne($stateParams.projectId),
                                  projectService.getAllTestGroups($stateParams.projectId);
                    }
                }
            }
        }
    });
    $stateProvider.state('list.edit-project', {
        url: '/edit-project/:projectId',
        views:{
            'main@':{
                templateUrl: 'partial/edit-project/edit-project.html',
                controller: 'EditProjectCtrl',
                resolve:{
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId);
                    }
                }
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/projects');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
