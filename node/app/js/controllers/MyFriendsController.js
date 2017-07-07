myApp.controller('MyfriendsController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {
 	
  //  $scope.$parent.body_class = "leftmenu memberprofile";
      	
    $scope.init = function () {
        $scope.friends = [];
        $scope.loadFriends();
    }
        
    $scope.loadFriends = function () {
        
        $http.post('/getUsersEnrolledInCourse', {
            cid: $routeParams.cid 
        }).success(
            function(data){
                Array.prototype.push.apply($scope.friends, data);
                console.log($scope.friends)
            }
        ).error(
            function(error){
              console.log(error)
            }
        );
        
    }


    $scope.sendFriendRequest = function(userId) {

        $http.post('/getUser').success(
            function(data){
                console.log("Sending request to " + userId + " from "+data._id+"...")

                $http.post('/sendRequestToFriend', {
                    from: data._id,
                    fromName: data.name,
                    to: userId,
                    status: "0"
                }).success(
                    function(data){
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




    $scope.init();




}]);