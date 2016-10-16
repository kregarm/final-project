angular.module('app', ['ui.bootstrap','ui.utils','ui.router','checklist-model', 'xeditable', 'ngSanitize', 'ui.tinymce', 'LocalForageModule']);

angular.module('app').constant('CONFIG',config);

angular.module('app').config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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
        },
        resolve:{
            loggedIn:function (authService) {
                return authService.isLoggedIn();
            }
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
        },
        resolve:{
            loggedIn:function (authService) {
                return authService.isLoggedIn();
            }
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
                        return projectService.getOne($stateParams.projectId);
                    },
                    envs: function (projectService, $stateParams) {
                        return projectService.getAllEnvironmentsBasedOnProject($stateParams.projectId);
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
                        return projectService.getOne($stateParams.projectId);
                    },
                    env: function (projectService, $stateParams) {
                        return projectService.getOneEnvironment($stateParams.envId);
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
                        return projectService.getOne($stateParams.projectId);
                    },
                    testGroups: function(projectService, $stateParams){
                        return projectService.getAllTestGroups($stateParams.projectId);
                    },
                    testCases: function (projectService, $stateParams) {
                        return projectService.getCasesBasedOnProject($stateParams.projectId);
                    },
                    testRuns: function (projectService, $stateParams) {
                        return projectService.getAllTestRunsBasedOnProject($stateParams.projectId);
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
                        return projectService.getOneTestCase($stateParams.testCaseId);
                    },
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId);
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
                        return projectService.getOne($stateParams.projectId);
                    },
                    testGroups: function (projectService, $stateParams) {
                        return projectService.getAllTestGroups($stateParams.projectId);
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
    $stateProvider.state('app.test-run', {
        url: '/:projectId/test-run/:testRunId',
        views:{
            'main@':{
                templateUrl: 'partial/test-run/test-run.html',
                controller: 'TestRunCtrl',
                resolve:{
                    project: function (projectService, $stateParams) {
                        return projectService.getOne($stateParams.projectId);
                    },
                    testRun: function (projectService, $stateParams) {
                        return projectService.getOneTestRun($stateParams.testRunId);
                    }
                }
            }
        }
    });
    $stateProvider.state('login', {
        url: '/login',
        views:{
            cover:{
                templateUrl: 'partial/login/login.html',
                controller: 'LoginCtrl'
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('requestInterceptorService');
});


angular.module('app').run(function($rootScope, dataService) {

    $rootScope.hasPermission = function(path, method){

        var allow = false;

        angular.forEach(dataService.model.userPermissions, function(permission){

            if(permission.path === path && _.includes(permission.methods, method)){
                allow = true;
            }

        });

        return allow;

    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){

        console.log(toState);

        switch(toState.name){
            case 'login':
                $rootScope.isCoverView = true;
                break;
            case 'register':
                $rootScope.isCoverView = true;
                break;
            case 'confirm-registration':
                $rootScope.isCoverView = true;
                break;
            case 'forgotten':
                $rootScope.isCoverView = true;
                break;
            case 'reset':
                $rootScope.isCoverView = true;
                break;
            default:
                $rootScope.isCoverView = false;
                break;
        }

    });

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
