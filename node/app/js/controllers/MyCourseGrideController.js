myApp.controller('MyCourseGrideController', ['$scope','$http','$location','$mdDialog','toastr', function($scope,$http,$location,$mdDialog,toastr) {

$scope.$parent.body_class = "";

    
/**
  * init key of module
  * @param moduleName
  * @param newKey
  * @param callback
  */
$scope.init = function () {

    //all variables
    $scope.courses = [];
    $scope.showTextBoxState=false;
    $scope.status = '  ';
    $scope.currentUser="";


    //all method calls
    $scope.getCurrentUser();
    $scope.loadCourses();
   


}


/**
  * change enrollment key of module
  * @param moduleName
  * @param newKey
  * @param callback
  */

$scope.loadCourses = function () {
    var params = {};
    var studentID=$scope.currentUser;

    $http({
        method: 'GET',
        url:'/getAllCourses',
        params: params
    }).then(
            function success(response) {

                $http.post('/getUser', {
        }).success(
            function(data){
           // $scope.currentUser=data._id;
            
           
                
                
                console.log("ddddddd")
                console.log(data._id);
                 $http.post('/isEnrolled', {
//                    user_id: $scope.currentUser
                    user_id: data._id
                    }).success(
                        function(dataIsEnrolled){
                         console.log("isEnroll called");
                            console.log(dataIsEnrolled);
                            
                            for(var i=0;i<dataIsEnrolled.length;i++){
                                for(var x=0;x<response.data.length;x++){
                                        console.log("x");
                                    
                                    if(response.data[x]._id==dataIsEnrolled[i].courseId){
                                        response.data[x].enrolled= true;
                                        console.log("Set True");
                                        //response.data.splice(x,1);
                                      //  console.log(dataIsEnrolled[i]);
                                        //console.log(response.data[x]);

                                    }
                                    //console.log(response.data[x]);
                                    //console.log(dataIsEnrolled[i]._id);

                                }

                            }


                           console.log(response.data);
                        Array.prototype.push.apply($scope.courses, response.data);
                        }
                    ).error(
                        function(error){
                        console.log(error);
                        }
                    );

               // console.log(response.data);
               // Array.prototype.push.apply($scope.courses, response.data);
                //console.log($scope.courses)
                
                
                }
        ).error(
            function(error){
            console.log(error);
            }
        );

            },
            function error(error) {
                console.log('Failed to load courses');
            }
    );
}


/**
  * change enrollment key of module
  * @param moduleName
  * @param newKey
  * @param callback
  */

$scope.showEnrollmentKeyPrompt = function(ev,cid) {
    var studentID=$scope.currentUser;
    var courseID=cid;
    console.log();

    var confirm = $mdDialog.prompt()
      .title()
      .textContent()
      .placeholder('Enrollment Key')
      .ariaLabel('Enrollment Key')
//      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Ok')
      .cancel('Cancel\'');
    $mdDialog.show(confirm).then(function(result) {
     // console.log(studentID);
        console.log(result);
        if(typeof result === "undefined"){
            console.log("Null");
            toastr.error('Please Enter the Key!', 'Woops');
        }else{

        $http.post('/getEnrollmentkeyByCourseId', {
        cid: courseID
        }).success(
            function(data){      
                
                console.log(data[0].enrollmentKey);
                if(data[0].enrollmentKey==result){
                    console.log("Matched");
                    
                    $http.post('/getUser', {
                    }).success(
                        function(data){
                        $scope.currentUser=data._id;
                       
                        
                    

                       $http.post('/addNewEnrollment', {
                        course_id: courseID,
                        student_id: data._id,
                        student_name: $scope.currentUserName
                    }).success(
                        function(data){
                           console.log(data);
                           $location.url('/course_module_forum/'+courseID); 
                            toastr.success('You have successfully Enrolled!', 'Welcome');
                        }
                    ).error(
                        function(error){
                            console.log(error);
                        }
                    );
                            
                            }
                    ).error(
                        function(error){
                        console.log(error);
                        }
                    );
                    

                }//-------------
                else{
                    console.log("wrong");
                    toastr.error('Invalied Enrollment Key!', 'Woops');
                }
                        
                        

            } 
        ).error(
            function(error){
              console.log(error)
            }
        );

    }
     }, function() {
        console.log("Don't");
    });

  };

    
    
    /**
  * change enrollment key of module
  * @param moduleName
  * @param newKey
  * @param callback
  */
    
$scope.getCurrentUser = function (){

     $http.post('/getUser', {
        }).success(
            function(data){
            $scope.currentUser=data._id;
            $scope.currentUserName=data.name;
             console.log($scope.currentUser);
            }
        ).error(
            function(error){
            console.log(error);
            }
        );

};



$scope.init();


}]);
