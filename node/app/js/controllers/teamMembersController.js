myApp.controller('teamMembersController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {
 	
  //  $scope.$parent.body_class = "leftmenu memberprofile";
      	
    $scope.init = function () {
        console.log("team cin");
        // $scope.loadMembers();
    }
    
    $scope.loadMembers = function () {
        
        $http.post('/getUser').success(
        function(data){
           console.log(data._id);
            
                
                
                $http.post('/getGroupId',{
                    userId: data._id,
                    courseId: $routeParams.cid
                }).success(
                function(data){
                   console.log(data[0].gId);
                    
                        $http.post('/getGroupMembers',{
                            gid: data[0].gId
                        }).success(
                        function(data){
                           console.log(data);
                            
                            console.log(data.length)
                            for(var x=0;x<data.length;x++){
                                
                                $http.post('/getUsers',{
                                    id: data[x].userId
                                }).success(
                                function(data){
                                    console.log();
                                    sleep(1000);
                          
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
        

    $scope.init();




}]);