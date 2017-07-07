myApp.controller('CourseModuleForumController', ['$scope','$http','$location', '$routeParams','$route','$mdDialog','toastr', function($scope,$http,$location,$routeParams,$route,$mdDialog,toastr) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
        $scope.n={};
        $scope.pending=false;
        $scope.accepted=false;
        $scope.isPending();
        $scope.isAccpted();
        $scope.groupIdForLec;
        $scope.userIdForCreateGroup;
        $scope.getGroupIdFromGroupId;
        $scope.groupForumStatus=false;
        $scope.lecturerAcceptStatus=false;
        $scope.groupFormedStatus=false;
      $scope.createGroup={};
      console.log("CourseModuleForumController started");
      //$scope.courseId=$routeParams.id;
      $scope.studentId=$routeParams.id;
      $scope.noticesArray=[];
      $scope.getAllNotices(); 
      $scope.getReceivedRequests();
      $scope.requestFromNameArr=[];
      $scope.currentUserId="";
      $scope.getCurrentUser();
      $scope.isGroupFormed();
         $scope. testx();
     // $scope.isPending();
     
       
        
//      /* $rootScope.$on('$routeChangeSuccess', function() {
//    $route.reload();*/
//});
        

     //   setInterval(function(){ $scope.requestFromNameArr=[];$scope.getReceivedRequests() }, 200000);
        
     //    setInterval(function(){ $scope.isGroupFormed(); }, 200000);
      
    }
    $scope. testx = function (){
        
        //var arr=[2.3,2.55,3,67];
        var x=Math.floor(Math.random() * (2)) + 3.84;
        console.log(x.toFixed(2));
    }
    
    $scope.isPending = function () {
        
        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
            console.log(data._id);
            $http.post('/isPending',{
                uid : data._id,
                cid : $scope.studentId
            }).success(
            function(data){
               console.log(data[0].pendingStatus);
               if(data[0].pendingStatus=="1"){
                   $scope.pending=true;
               }
            }
            ).error(
                function(error){
                    console.log(error)
                }
            );
            
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
        
    }
    
    
     $scope.isAccpted = function () {
        
        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
            console.log(data._id);
            $http.post('/getAcceptedStatus',{
                uid : data._id,
                cid : $scope.studentId
            }).success(
            function(data){
//               console.log(data[0].pendingStatus);
               console.log(data);
               if(data[0].acceptStatus=="1"){
                   $scope.accepted=true;
               }
            }
            ).error(
                function(error){
                    console.log(error)
                }
            );
            
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
        
    }
    
     $scope.getReceivedRequests = function () {
        
       $http.post('/getUser').success(
        function(data){
            $http.post('/getReceivedRequests', {
                userId: data._id,
                status: "0"
            }).success(
                function(data){
                    $scope.myRequests = data.length;
                   // console.log(data);
                    Array.prototype.push.apply($scope.requestFromNameArr, data);
                    
                }
            ).error(
                function(error){
                    console.log(error);
                }
            );
        }
    ).error(
	    function(error){
        	console.log(error)
      	}
    );
         
    }
     
     $scope.getAllNotices = function (){
         
          $http.post('/getAllNotices',{
              cid:$routeParams.id
          }).success(
        function(data){
           // console.log(data);
             Array.prototype.push.apply($scope.noticesArray, data);
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
         
     }
     $scope.test = function (id){
         
         console.log(id+"dfgdf");
         $location.url('/course_received_request/'+id+'/'+$routeParams.id);
     }
     
     $scope.getCurrentUser = function(){
       
        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
//            console.log("userId");
//            console.log($scope.currentUserId);
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
         
     };
    
    
    $scope.isGroupFormed = function() {
        
//        $http.post('/createNewcourseModuleGroups', {
//            userId: "o",
//            status: "0"
//        }).success(
//        function(data){
//           console.log(data);
//        }
//        ).error(
//            function(error){
//                console.log(error)
//            }
//        );
       
        
        
        $http.post('/getUser').success( //to get the current logged user
        function(data){
            
            
        $http.post('/getGroupId', { //to get tht group id from the userid and courseid
//        $http.post('/getGroupIdFromGroup', { //to get tht group id from the userid and courseid
        userId:data._id,
        courseId:$scope.studentId
        }).success(
        function(data){
            if(data[0]){
         //  console.log(data[0].gId);
            $scope.groupIdForLec=data[0].gId;
            //
            
                $http.post('/getGroupCount',{ //to get the no of groups formed
                 gid: data[0].gId
                }).success(
                function(data){
                   console.log(data);
                    if(data=="4" || data > 4){
                        console.log("Group Formed");
                        $scope.groupFormedStatus=true;
                        console.log($scope.groupIdForLec);
                        
                                $http.post('/getLecturerAcceptStaus',{
                                    gid: $scope.groupIdForLec
                                }).success(
                                function(data){
                                console.log(data);
                                    if(data.lecturerAccepted=="1"){
                                        console.log("done");
                                        $scope.groupForumStatus=true;
                                    }else {
                                        $scope.lecturerAcceptStatus=true;
                                    }
                                }
                                ).error(
                                    function(error){
                                        console.log(error)
                                    }
                                );
                    }
                    
                }
                ).error(
                    function(error){
                        console.log(error)
                    }
                );
            //
            }else{
               // console.log("cant get gid");
            }
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
          
        }
    ).error(
	    function(error){
        	console.log(error)
      	}
    );
//        
       
        
        
    };
    
    
  

  $scope.showAdvanced = function(ev) {
   
      console.log("goda");
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen
    })
    .then(function(answer) {
//      $scope.status = 'You said the information was "' + answer + '".';
    
    }, function() {
     
    });
  };

 


  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        
        console.log($scope.createGroup.name);
        console.log($scope.createGroup.IdNumber);
        console.log($scope.createGroup.cgpa);
        console.log($scope.createGroup.groupName);
         toastr.info('Group Created Successfully!', 'Good Job');
        
        
        $http.post('/getUser').success(
        function(data){
            console.log(data);
            $scope.userIdForCreateGroup=data._id;
            $http.post('/createGroups',{
            name:$scope.createGroup.name,
            idno:$scope.createGroup.IdNumber,
            cgpa:$scope.createGroup.cgpa,
            groupname:$scope.createGroup.groupName,
            userid:data._id,
            courseid:$routeParams.id
                
            }).success(
            function(data){
                console.log(data);
                
                        
                        $http.post('/getGroupIdFromGroup',{
                            userid:$scope.userIdForCreateGroup,
                            courseid:$routeParams.id
                        }).success(
                        function(data){
                            
                            console.log(data[0]._id);
                            $scope.getGroupIdFromGroupId=data[0]._id;
                           
                           // console.log(data);
                                    //to create the member
                                     $http.post('/createNewcourseGroupMembers', {
                                    gid: $scope.getGroupIdFromGroupId,
                                    courseid: $routeParams.id,
                                    userid: $scope.userIdForCreateGroup
                                    }).success(
                                        function(data){
                                            console.log(data);
                                        }
                                    ).error(
                                        function(error){
                                          console.log(error)
                                        }
                                    );
                            
                            //when loading forum to show the group formed
                                    $http.post('/sendRequestToFriend', {
                                    from: $scope.userIdForCreateGroup,
                                    fromName: "Leader",
                                    to: "Leader",
                                    cid: $routeParams.id,
                                    gid: $scope.getGroupIdFromGroupId,
                                    status: "0",
                                    acceptStatus: "1",
                                    pending: "0"
                                }).success(
                                    function(data){
                                       
                                    }
                                ).error(
                                    function(error){
                                        console.log(error);
                                    }
                                );
                            
                
                        }
                        ).error(
                            function(error){
                                console.log(error)
                            }
                        );
    
            }
            ).error(
                function(error){
                    console.log(error)
                }
            );
            
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
        

        
        
        
        
      $mdDialog.hide(answer);
    };
  }

    $scope.init();






    /************************************************************************************
    *************************************************************************************
        
        Kichiki following functions are related to projects part. Dont change any thing

    *************************************************************************************
    ************************************************************************************/


    $scope.bidForProject = function(poc){

        $http.post('/getUser').success(
            function(user){

                $http.post('/projects/bidForProject', {
                    poc: poc,
                    user: user
                }).success(
                    function(data){
                       console.log(data)
                       $scope.getAllMyProjects();
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

    $scope.getAllMyProjects = function(poc){

        $http.post('/getUser').success(
            function(user){

                $http.post('/projects/getAllMyProjects', {
                    user: user
                }).success(
                    function(data){
                        $scope.approved_projects_list = data
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );


                $http.post('/projects/getAllMyPendingProjects', {
                    user: user
                }).success(
                    function(data){
                        $scope.pending_projects_list = data
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );


                $http.post('/projects/getAllMyRejectedProjects', {
                    user: user
                }).success(
                    function(data){
                        $scope.rejected_projects_list = data
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );


                $http.post('/projects/getProjectsListForCourse', {
                    cid: $routeParams.id,
                    user: user
                }).success(
                    function(data){
                        $scope.projects_list = data
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );

            }
        ).error(
          function(error){
            console.log(error)
          }
        );

    }

    $scope.getAllMyProjects();

    $scope.viewMyProject = function(project){
        console.log()
         $location.url('/project_module_forum/'+project._id);
        //TODO: continue development
    }

















}]);
