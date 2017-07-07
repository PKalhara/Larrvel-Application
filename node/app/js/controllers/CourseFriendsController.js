myApp.controller('CourseFriendsController', ['$scope','$http','$location', '$routeParams','$notification','toastr', function($scope,$http,$location,$routeParams,$notification,toastr) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
      console.log("CourseFriendsController started");
      $scope.friends = [];
      $scope.loadFriends();
      $scope.getLoggedUser();
        
        
    }

    $scope.loadFriends = function () {
        console.log($routeParams.id);

            $http.post('/getUsersEnrolledInCourse', {
                cid: $routeParams.id 
            }).success(
                function(data){
                    Array.prototype.push.apply($scope.friends, data);
                    console.log(data)
                }
            ).error(
                function(error){
                  console.log(error)
                }
            );

        }
    
    $scope.sendFriendRequest = function(userId) {
        console.log(userId);

        $http.post('/getUser').success(
            function(data){
                console.log("Sending request to " + userId + " from "+data._id+"...")
                $http.post('/sendRequestToFriend', {
                    from: data._id,
                    fromName: data.name,
                    to: userId,
                    status: "0",
                    acceptStatus: "0"
                }).success(
                    function(data){
                        
                        toastr.success('Request Sent!!!');
                        if(data == "pass"){
                            //$location.url('/profile');

                        }else{
                            //$location.url('/login');
                        }
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
    
    $scope.getLoggedUser = function(){
        
         $http.post('/getUser').success(
            function(data){
                $scope.user_id=data._id;
                
            }
        ).error(
          function(error){
            console.log(error)
          }
        ); 
        
    }

    $scope.init();




}]);
