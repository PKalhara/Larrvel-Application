myApp.controller('CourseReceivedRequestCintroller', ['$scope','$http','$location', '$routeParams','toastr', function($scope,$http,$location,$routeParams,toastr) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
      console.log("CourseReceivedRequestCintroller started");
      console.log($routeParams.cid);
      $scope.loadRequest();
      $scope.myRequestsArr=[];

    }
    
   $scope.loadRequest = function(){
       
       	$http.post('/getUser').success(
        function(data){
            $http.post('/getMyFriendsRequests', {
                userId: $routeParams.id
            }).success(
                function(data){
                    console.log(data);
                    Array.prototype.push.apply($scope.myRequestsArr, data);
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
   
   $scope.acceptRequest = function(rid,gID,cID,rFromID){
       console.log(gID);
toastr.success('Accepted!', 'Good Job');
       
       $http.post('/acceptFriendRequest', {
                status: "1",
                acceptStatus: "1",
                id: rid
            }).success(
                function(data){
                    console.log(data);
                    
                    $http.post('/setRequestAcceptStatus', {
                    id: $routeParams.id,
                    cid: $routeParams.cid
                    }).success(
                        function(status){
                            console.log(status);
                            // first happens
                            $http.post('/createNewcourseGroupMembers', {
                            gid: gID,
                            courseid: cID,
                            userid:rFromID
                            }).success(
                                function(data){
                                    console.log(data);
                                }
                            ).error(
                                function(error){
                                  console.log(error)
                                }
                            );
                               
                            //second request
                            

                                                
                                                
                                                   $http.post('/updateMemberCount', {
                                                        gid:gID
                                                    }).success(
                                                        function(data){
                                                            console.log(data);



                                                        }
                                                    ).error(
                                                        function(error){
                                                          console.log(error)
                                                        }
                                                    );


                            //update pending status
                            
                            
                             $http.post('/updatePendingStatus', {
                                                        uid: $routeParams.id,
                                                        cid: $routeParams.cid
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
                  console.log(error)
                }
            );
       
       
       
   }
   
   $scope.declineRequest = function(rid){
       console.log("done");
       toastr.error('Declined!', 'Woops');
       
        $http.post('/diclineFriendRequest', {
                status: "1",
                acceptStatus: "0",
                id: rid
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


    $scope.init();




}]);
