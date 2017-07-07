myApp.controller('ModuleGroupController', ['$scope','$http','$location', '$routeParams','toastr', function($scope,$http,$location,$routeParams,toastr) {
 	

      	
    $scope.init = function () {
      console.log("ModuleGroupController started");
        $scope.courseId=$routeParams.id;
        $scope.isTeamLeader=true;
        $scope.getCurrentUser();
        $scope.group=[];
       // $scope.checkRequestSent();
        $scope.getAllGroups();
    }
    
    
    $scope.checkRequestSent = function (){

        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
            console.log($scope.currentUserId);
            
            $http.post('/').success(
            function(data){
               $scope.currentUserId=data._id;

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

    $scope.getAllGroups = function (){
        var groupID;
        var gArr={};
        var arr=[];
        $http.post('/getAllCourseGroups', {
            cid: $scope.courseId
            }).success(
                function(data){
                    console.log(data);
                    for(var x=0;x<data.length;x++){
                        
        
                        
                        console.log($scope.currentUserId);
                        if(data[x].userId==$scope.currentUserId){
                            $scope.isTeamLeader=false;
                        }
                       
                    }
                    Array.prototype.push.apply($scope.group, data);
                   
//                    gArr=data;
//                    for(var x=0 ;x<data.length;x++){
//                        
//                        groupID=data[x]._id;
//                        //console.log(data[x]._id);
//                           $http.post('/getGroupCountMembers',{
//                             gid:data[x]._id
//                            }).success(
//                            function(data){
//                                
//                               
//                                 //console.log(data);
//                                arr.push(data);
//                                //console.log(arr)
////                                if(groupID==data.gid){
////                                    console.log("dfd");
////                                }
//                                
//                                for (var i=0;i<arr.length;i++){
//                                   // console.log(arr[i]);
//                                    if(arr[i].gid==groupID){
//                                        //console.log("found");
//                                        break;
//                                    }
//                                    
//                                }
//                                
//                   
//                            }
//                            ).error(
//                                function(error){
//                                    console.log(error)
//                                }
//                            );
//                        
//                        
//                    }
                }
            ).error(
                function(error){
                  console.log(error)
                }
            );
        
    };

    $scope.sendFriendRequest = function (id,gId){
        console.log(gId);
        
        
        $http.post('/getUser').success(
            function(data){
                console.log("Sending request to " + id + " from "+data._id+"...")
                toastr.success('Resquest Sent Successfully!', 'Good Job');

                $http.post('/sendRequestToFriend', {
                    from: data._id,
                    fromName: data.name,
                    to: id,
                    cid: $scope.courseId,
                    gid: gId,
                    status: "0",
                    acceptStatus: "0",
                    pending: "1"
                }).success(
                    function(data){
                        
//                        if(data == "pass"){
//                            //$location.url('/profile');
//
//                        }else{
//                            //$location.url('/login');
//                        }
                        console.log(data);
                        
                        $http.post('/getUser').success(
                        function(data){
                           $scope.currentUserId=data._id;
                           
                            
                            $http.post('/updatePendingStatusInv', {
                                                        uid: data._id,
                                                        cid: $routeParams.id
                                                    }).success(
                                                        function(data){
                                                            console.log(data);



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
    
    $scope.getCurrentUser = function(){
       
        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
           // console.log($scope.currentUserId);
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
         
     };
    
    $scope.init();




}]);