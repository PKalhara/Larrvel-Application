lectApp.controller('ProjectsController', ['$scope','$http','$location','$routeParams','$mdToast', function($scope,$http,$location,$routeParams,$mdToast) {



    /**
     * get all projects
     * @param moduleName
     * @param projects
     */
    var getAllProjects = function(){
        $http({
            method: 'GET',
            url:'/projects/getAllProjects'
        }).then(
                function success(response) {
                    console.log(response)
                    $scope.projects = response.data
                    $scope.selectedOption = $scope.projects[0];
                },
                function error(error) {
                    console.log('Failed to load courses');
                }
        );
    }

    getAllProjects()


    $http.post('/getUser').success(
        function(user){
            console.log("Logged user Id: "+ user._id);
        }
    ).error(
      function(error){
        console.log(error)
      }
    );

    /**
     * post all projects
     * @param name,desc
     */
	$scope.addProjectFormSubmit = function() {


		$http.post('/projects/createProject', {
            name: $scope.formData.pname,
            desc: $scope.formData.pdes
        }).success(
            function(data){
                if(data == "pass"){

                    $scope.formData.pname="";
                    $scope.formData.pdes="";
                    getAllProjects()

                    $mdToast.show($mdToast.simple().textContent("Project Successfully Created!").position('bottom right').hideDelay(5000));
                    console.log("created")
                }else{
                    $mdToast.show($mdToast.simple().textContent("Failed!").position('bottom right').hideDelay(5000));
                    console.log("failed")
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );
	}

    /**
     * get all notices
     * @param module name
     */
    var refreshNotices = function(name){

        $http.post('/projects/getProjectNotices', {
             project:name
        }).success(
            function(data){
                console.log(data)
                $scope.notices = data
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );

    }

    /**
     * post postNoticeFormSubmit
     * @param user,title,description
     */
    $scope.postNoticeFormSubmit = function() {

        console.log($scope.selectedOption)
        
        $http.post('/getUser').success(
            function(user){

                $http.post('/projects/postNoticeForProject', {
                    user: user,
                    project: $scope.selectedOption,
                    title: $scope.formData.notice_title,
                    description: $scope.formData.notice_desc
                }).success(
                    function(data){
                        
                        $scope.formData.notice_title="";
                        $scope.formData.notice_desc="";

                        refreshNotices($scope.selectedOption.name)

                        $mdToast.show($mdToast.simple().textContent("Notice Successfully Posted!").position('bottom right').hideDelay(5000));

                       console.log(data)
                    }
                ).error(
                    function(error){

                    }
                );

            }
        ).error(
          function(error){
            console.log(error)
          }
        );
    }

    /**
     * post selectedItemChanged
     * @param project
     */
    $scope.selectedItemChanged = function(){
        console.log('You selected number ' + $scope.selectedOption.name)

        $http.post('/projects/getProjectNotices', {
             project:$scope.selectedOption.name
        }).success(
            function(data){
                console.log(data)
                $scope.notices = data
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );

    }



}]).controller('AssignProjectsController', ['$scope','$http','$location','$routeParams','$mdDialog','$mdToast', function($scope,$http,$location,$routeParams,$mdDialog,$mdToast) {

    /**
     * post getAllProjects
     * @param url,method
     */
    var getAllProjects = function(){
        $http({
            method: 'GET',
            url:'/projects/getAllProjects2'
        }).then(
                function success(response) {
                    console.log(response)
                    $scope.projects = response.data
                },
                function error(error) {
                    console.log('Failed to load courses');
                }
        );

    }

    getAllProjects()


    $http({
        method: 'GET',
        url:'/getAllCourses'
    }).then(
        function success(response) {
            $scope.courses = response.data;
        },
        function error(error) {
            console.log('Failed to load courses');
        }
    );

    /**
     * post viewProjet
     * @param ev,name,desciption
     */
    $scope.viewProjet = function(ev,name,desciption) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent:ev,
            clickOutsideToClose:true,
            template:
            '<md-dialog aria-label="JIT Math" >' +
                '<form ng-cloak>' +
                    '<md-toolbar>' +
                      '<div class="md-toolbar-tools">' +
                        '<h2>'+name+'</h2>' +
                      '</div>' +
                    '</md-toolbar>' +
                    '<md-dialog-content>' +
                      '<div class="md-dialog-content">' +
                        '<h4>Description</h4>' +
                        '<p>'+desciption+'</p>' +
                      '</div>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions layout="row">' +
                        '<span flex></span>' +
                        '<md-button ng-click="answer()">Assign</md-button>' +
                    '</md-dialog-actions>' +
                '</form>' +
            '</md-dialog>',
            locals: {
            },
            controller: DialogController
        });

        function DialogController($scope, $mdDialog) {
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
        }
    }

    /**
     * post assignProjet
     * @param ev,name,pId,project
     */
    $scope.assignProjet = function(ev,name,pId,project) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: ev,
            clickOutsideToClose:true,
            template:
                '<md-dialog aria-label="JIT Math" >' +
                    '<form ng-cloak>' +
                        '<md-dialog-content>' +
                          '<div class="md-dialog-content">' +
                            '<h3>'+name+'</h3>' +
                            '<p>Please Select the Course</p>' +
                             '<md-select ng-model="ctrl">' +
                                '<md-option ng-repeat="(index,course) in courses" ng-value="course" ng-selected="index == 0">{{course.courseName}}</md-option>' +
                            '</md-select>' +
                          '</div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions layout="row">' +
                            '<md-button ng-click="answer(ctrl)">Assign</md-button>' +
                        '</md-dialog-actions>' +
                    '</form>' +
                '</md-dialog>',
            locals: {
                courses: $scope.courses,
                projectId: pId,
                projectName: name,
                project: project
            },
            controller: AsignController
        });

        /**
         * post AsignController
         * @param courses, projectId, projectName,project
         */
        function AsignController($scope, $mdDialog, courses, projectId, projectName,project) {

            $scope.courses = courses;
            //$scope.project = project;

            $scope.answer = function(ctrl) {
                $mdDialog.hide();

                $http.post('/projects/createProjectOfCourse', {
                    course: ctrl,
                    project: project
                }).success(
                    function(data){
                        if(data == "pass"){

                            //1=> assigned
                            //0=>not assigned
                            //set assigned status to 1       
                            //assigned

                            $http.post('/projects/markAssignStatusOfProject', {
                                project: project
                            }).success(
                                function(data){
                                    console.log("sucessfully status updated")
                                    getAllProjects()
                                    $mdToast.show($mdToast.simple().textContent(projectName+ " successfuly assigned to "+ctrl.courseName).position('bottom right').hideDelay(5000));
                                }
                            ).error(
                                function(error){
                                    console.log(error);
                                }
                            );

                            
                        }else{
                            $mdToast.show($mdToast.simple().textContent("Project assign Failed!").position('bottom right').hideDelay(5000));
                        }
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );



            }
        }
    }


}]).controller('MyProjectsController', ['$scope','$http','$location','$routeParams','$mdDialog','$mdToast', function($scope,$http,$location,$routeParams,$mdDialog,$mdToast) {

    /**
     * GET getAllProjects
     * @param courses, projectId, projectName,project
     */
    var getAllProjects = function(){

        $http({
            method: 'GET',
            url:'/projects/getAllProjectOfCourse'
        }).then(
            function success(response) {
                $scope.projects = response.data
            },
            function error(error) {
                console.log('Failed to load courses');
            }
        );
    }

    getAllProjects()

    /**
     * GET approve - bids approve
     * @param bid,poc
     */
    $scope.approve = function(bid,poc){
        $http.post('/projects/approveBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Approved!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }

    /**
     * GET decline - bids decline
     * @param bid,poc
     */
    $scope.decline = function(bid,poc){
 
        $http.post('/projects/declineBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Rejected!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }


    /**
     * GET recover - bids recover
     * @param bid,poc
     */
    $scope.recover = function(bid,poc){
 
        $http.post('/projects/recoverBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Recovered!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }

    
    /**
     * GET delete - bids delete
     * @param bid,poc
     */
    $scope.delete = function(bid,poc){

        $http.post('/projects/removeBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Deleted!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }





}]);
