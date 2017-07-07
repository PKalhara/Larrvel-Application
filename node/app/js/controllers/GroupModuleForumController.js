myApp.controller('GroupModuleForumController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {
 	
  //  $scope.$parent.body_class = "leftmenu memberprofile";
      	
    $scope.init = function () {
        console.log("Module Forum Group started");
        $scope.courseMessages=[];
        $scope.Message;
         $scope.groupId=$routeParams.gid;
        console.log($scope.groupId);
        
        $scope.getAllGroups();
       
    }
    
    $scope.getAllGroups = function (){
        
        
        $http.post('/getAllMessages',{
            gid:$routeParams.gid
        }).success(
        function(data){
            Array.prototype.push.apply($scope.courseMessages, data);
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
        
    }
        

    $scope.sendMessage = function (){
        
        $http.post('/getUser').success(
        function(data){
            console.log(data)
            
                    $http.post('/createNewMessage',{
                        gid:$routeParams.gid,
                        message:$scope.Message,
                        name:data.name
                    }).success(
                    function(data){
                        console.log(data);
                        $scope.courseMessages=[];
                         $scope.getAllGroups();
                        
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