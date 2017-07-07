var lectApp = angular.module('lectApp', ['ngRoute','ngAnimate','ngMaterial','hSweetAlert','angular-chosen']);

lectApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/lecturer', {
        templateUrl: 'views/courses.html',
        controller: ''
    }).
  when('/assignLecturer', {
    templateUrl: 'views/assignLecturer.html',
    controller: 'lecturerController'
  }).
  when('/modules', {
      templateUrl: 'views/modules.html',
      controller: 'moduleController'
  }).
  when('/modules_single/:id?', {
      templateUrl: 'views/modules_single.html',
      controller: 'SingleModuleController'
  }).
  when('/supervisorView', {
    templateUrl: 'views/supervisorView.html',
    controller: 'supervisorController'
  }).
    when('/assignLecturer/:id?', {
      templateUrl: 'views/assignLecturer.html',
      controller: 'lecturerController'
    }).
    when('/addProjects', {
      templateUrl: 'views/add_projects.html',
      controller: 'ProjectsController'
    }).
    when('/assignProjects', {
      templateUrl: 'views/assignProjects.html',
      controller: 'AssignProjectsController'
    }).
    when('/myProjects', {
      templateUrl: 'views/myProjects.html',
      controller: 'MyProjectsController'
    }).
    when('/myProjects', {
        templateUrl: 'views/myProjects.html',
        controller: 'MyProjectsController'
    }).
    when('/addLecturer', {
        templateUrl: 'views/add_lecturer.html',
        controller: 'lecturerController'
    }).
    when('/createModule', {
        templateUrl: 'views/create_module.html',
        controller: 'moduleController'
    }).
    when('/moduleDetails/:id?', {
        templateUrl: 'views/modules_details.html',
        controller: 'SingleModuleController'
    }).
    when('/supervisorCal', {
        templateUrl: 'views/supervisorCalendar.html',
        controller: 'supervisorController'
    }).
//    when('/teamAcceptView', {
//        templateUrl: 'views/teamAcceptView.html',
//        controller: 'teamAcceptView'
//    }).
    otherwise({
      redirectTo: '/lecturer'
    });
}]);


