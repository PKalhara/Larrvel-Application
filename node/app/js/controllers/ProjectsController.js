myApp.controller('ProjectsController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {


	$http.post('/projects/getProjectsListForCourse', {
        cid: $routeParams.id
    }).success(
        function(data){
            $scope.projects_list = data
        }
    ).error(
        function(error){
            console.log(error);
        }
    );

    $scope.bidForProject = function(poc){

        $http.post('/getUser').success(
            function(user){

                $http.post('/projects/bidForProject', {
                    poc: poc,
                    user: user
                }).success(
                    function(data){
                       console.log(data)
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





}]);
