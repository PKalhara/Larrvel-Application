myApp.controller('MyCoursesController', ['$scope','$http','$location','$mdDialog', function($scope,$http,$location,$mdDialog) {
 	
$scope.$parent.body_class = "leftmenu memberprofile";
  	
$scope.init = function () {
    
    //all variables
    $scope.courses = [];
    $scope.showTextBoxState=false;
    $scope.status = '  ';
    $scope.currentUser="";
    
    
    //all method calls
    $scope.getCurrentUser();
    $scope.loadCourses();
    $scope.getCurrentUser();
    
    
}
    
$scope.loadCourses = function () {
    var params = {};
    var studentID=$scope.currentUser;
    
    $http({
        method: 'GET',
        url:'/getAllCourses',
        params: params
    }).then(
            function success(response) {
                //console.log(response.data);
                console.log("ID detected");
                console.log($scope.currentUser);
                //$scope.checkIsEnrolled(studentID);
                //console.log($scope.enrolledCourses);
                
                $http.post('/isEnrolled', {
                    user_id: $scope.currentUser
                    }).success(
                        function(data){
                         console.log("isEnroll called");
                            console.log(data);
                        }
                    ).error(
                        function(error){
                        console.log(error);
                        }
                    );
                $scope.enrolledCourses = {};

                console.log(response.data);
                Array.prototype.push.apply($scope.courses, response.data);
                //console.log($scope.courses)
	
            },
            function error(error) {
                console.log('Failed to load courses');
            }
    );
}


$scope.getCurrentUser = function (){
     
     $http.post('/getUser', {
        }).success(
            function(data){
            $scope.currentUser=data._id; 
             //console.log($scope.currentUser);
            }
        ).error(
            function(error){
            console.log(error);
            }
        );
    
};


$scope.checkIsEnrolled = function(userId){
$scope.enrolledCourses={};
    $http.post('/isEnrolled', {
        user_id: userId
        }).success(
            function(data){
             console.log("isEnroll called");
             $scope.enrolledCourses = data;
            }
        ).error(
            function(error){
            console.log(error);
            }
        );
}
    
$scope.loadMembers = function(cid){

    $location.url('/my_friends/'+ cid);  
    
    // $http.post('/getUsersEnrolledInCourse', {
    //     cid: cid
    // }).success(
    //     function(data){
    //         console.log(data);
    //     }
    // ).error(
    //     function(error){
    //       console.log(error)
    //     }
    // );

}

$scope.showTextBox = function(index){

    console.log($scope.showTextBoxState);
    $scope.showTextBoxState=true;
    console.log($scope.showTextBoxState);
};
    
$scope.getCurrentUser = function (){
     
     $http.post('/getUser', {
        }).success(
            function(data){
            $scope.currentUser=data._id; 
             console.log($scope.currentUser);
            }
        ).error(
            function(error){
            console.log(error);
            }
        );
    
};

$scope.checkEnrollKey = function(id,txt){

    console.log(id);
    console.log("enroll Key Pressed");
    console.log(txt);

    $http.post('/checkEnrollmentKey', {
        cid: txt
    }).success(
        function(data){
            if(data==1){
                console.log("done");
            }
           
        }
    ).error(
        function(error){
          if(error==1){
            $location.url('/single_course/'+id);  
          }
        }
    );

};







$scope.init();
  	

}]);