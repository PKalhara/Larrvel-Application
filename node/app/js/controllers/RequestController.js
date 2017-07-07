myApp.controller('RequestController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {

	$http.post('/getUser').success(
        function(data){
            $http.post('/getReceivedRequests', {
                userId: data._id,
                status: "0"
            }).success(
                function(data){
                    $scope.myRequests = data
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



}]); 	
