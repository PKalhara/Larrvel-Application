var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'toastr','ngMaterial','notifications']);


myApp.config(['$routeProvider','toastrConfig', function($routeProvider,toastrConfig) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/course', {
      templateUrl: 'views/courses.html',
      controller: 'CourseController'
    }).
    when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
    }).
    when('/my_courses', {
      templateUrl: 'views/my_courses.html',
      controller: 'MyCoursesController'
    }).
    when('/my_coursee_grid', {
      templateUrl: 'views/course-list-grid.html',
      controller: 'MyCourseGrideController'
    }).
    when('/single_course/:id?', {
      templateUrl: 'views/course-single.html',
      controller: 'SingleCourseController'
    }).
    when('/my_friends/:cid', {
      templateUrl: 'views/my-friends.html',
      controller: 'MyfriendsController'
    }).
    when('/friend_requests', {
      templateUrl: 'views/friend_requests.html',
      controller: 'RequestController'
    }).
    when('/course_module_forum/:id?', {
      templateUrl: 'views/course_module_forum.html',
      controller: 'CourseModuleForumController'
    }).
    when('/course_friends/:id?', {
      templateUrl: 'views/my_friends_course.html',
      controller: 'CourseFriendsController'
    }).
    when('/course_received_request/:id?/:cid?', {
      templateUrl: 'views/course-received-request.html',
      controller: 'CourseReceivedRequestCintroller'
    }).
    when('/projects_list/:id?', {
      templateUrl: 'views/projects_list.html',
      controller: 'ProjectsController'
    }).
    when('/all_module_groups/:id?', {
      templateUrl: 'views/all-module-groups.html',
      controller: 'ModuleGroupController'
    }).
    when('/test', {
      templateUrl: 'views/test.html',
      controller: 'testController'
    }).
    when('/courseGroupForum/:gid?', {
      templateUrl: 'views/groupForum.html',
      controller: 'GroupModuleForumController'
    }).
     when('/viewAllTeamMembers/:cid?', {
      templateUrl: 'views/allTeamMembers.html',
      controller: 'teamMembersController'
	 }).
    when('/project_module_forum/:id?', {
      templateUrl: 'views/project_module_forum.html',
      controller: 'ProjectModuleForumController'
    }).
    when('/lec', {
      templateUrl: 'lecturer/views/courses.html',
      controller: ''
    }).
    otherwise({
      redirectTo: '/login'
    });



  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: true,
    tapToDismiss: true,
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      preventOpenDuplicates: true
  });

}]);
