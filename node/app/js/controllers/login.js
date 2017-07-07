myApp.controller('LoginController', ['$scope','$http','$location','$window','toastr', function($scope,$http,$location,$window,toastr) {

    $scope.$parent.body_class = "";
    $scope.init = function(){

        console.log("Init started");

        $scope.registerContent = false;
        $scope.loginContent = true;
    };


  	$scope.login = function(email,password) {
    	console.log(email +"  "+password);

      $http.post('/login', {
        username: email,
        password: password
      }).success(
        function(data){
          if(data == "pass"){

            $http.post('/getUser').success(
                function(data){
                    if(data.userType == 'lecturer'){
                        //console.log("lecturer logged!!!")
                        $window.open('http://localhost:3000/lecturer/#/supervisorView','_self');
                        //$location.path('lecturer/#/lecturer');
                    }else{
                        $location.url('/my_coursee_grid');
                    }

                }
            ).error(
                function(error){
                    console.log(error)
                }
            );

          }else{
            $location.url('/login');
          }
        }
      ).error(
        function(error){
          console.log(error)
        }
      );

    }

    $scope.register = function(name,email,itnum,password) {
        console.log(email +"  "+password);

        $http.post('/registerUser', {
            name: name,
            username: email,
            itnum: itnum,
            password: password
        }).success(
            function(data){
                if(data == "pass"){
                    $location.url('/');
                    toastr.success('You have successfully registered!', 'Welcome');
                }else{
                    $location.url('/login');
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

    }

    $scope.showregister = function () {
        $scope.registerContent = true;
    }

    $scope.showlogin = function () {
        $scope.registerContent = false;
    }
    
    $scope.init();


}]);