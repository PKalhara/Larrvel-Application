myApp.controller('ProjectModuleForumController', ['$scope','$http','$location', '$routeParams','$route', function($scope,$http,$location,$routeParams,$route){ 

	$scope.init = function () {
		$scope.project_name;
		$scope.notices;
	}


	$http.post('/projects/getProjectData', {
	    pid : $routeParams.id
	}).success(
	    function(data){
	    	
	    	$scope.project_name = data[0].name;

	    	$scope.notices = data[0].notices;

	    	console.log(data[0].notices)

	    }
	).error(
	    function(error){
	        console.log(error);
	    }
	);


	$scope.init()

}]);

