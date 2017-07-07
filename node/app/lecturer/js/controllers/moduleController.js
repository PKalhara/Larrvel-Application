/**
 * Created by PathmilaWK on 9/23/2016.
 */
lectApp.controller('moduleController', ['$scope','$http','$location','$mdToast', function($scope,$http,$location,$mdToast) {

    $scope.$parent.body_class = "";
    $scope.init = function(){
        console.log("Init started(module home)");
        $scope.lecturers= [];
        $scope.getLecturers();
        $scope.courses = [];
        $scope.loadModulesFirstYear();
        $scope.years= ['Year 1','Year 2','Year 3','Year 4'];
        $scope.semesters= ['Semester 1','Semester 2'];
        
    };

    /**
     * load all modules at init
     */
    $scope.loadModulesFirstYear = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllCoursesFirstYear',
            params: params
        }).then(
            function success(response) {
                //console.log(response.data);

                Array.prototype.push.apply($scope.courses, response.data);
                console.log($scope.courses)

            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );
    }

    $scope.loadModulesSecondYear = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllCoursesSecondYear',
            params: params
        }).then(
            function success(response) {
                //console.log(response.data);
                $scope.courses = [];
                Array.prototype.push.apply($scope.courses, response.data);
                console.log($scope.courses)

            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );
    }

    /**
     * get all lecturers at init
     */
    $scope.getLecturers = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllLecturersNames',
            params: params
        }).then(
            function success(response) {
                Array.prototype.push.apply($scope.lecturers, response.data);
                /*angular.forEach(response.data, function(value, key) {
                    Array.prototype.push.apply($scope.lecturers, response.data['name']);;
                });*/
                console.log($scope.lecturers);
            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );
    }

    $scope.clear = function () {
        $scope.formData.name="";
        $scope.formData.abbr="";
        $scope.formData.description="";
        $scope.formData.enkey="";
    }

    /**
     * create a new module
     */
    $scope.createModuleFormSubmit = function () {

        $http.post('/createModuleFormSubmit', {
            name: $scope.formData.name,
            year: $scope.formData.year,
            semester: $scope.formData.semester,
            abbr: $scope.formData.abbr,
            enkey: $scope.formData.enkey,
            description: $scope.formData.description,
            lecInCharge: $scope.formData.lecInCharge.name
        }).success(
            function(data){
                if(data == "pass"){

                    $mdToast.show($mdToast.simple().textContent("Module added to the system successfully").position('bottom right').hideDelay(5000));

                    $scope.formData.name="";
                    $scope.formData.abbr="";
                    $scope.formData.description="";
                    $scope.formData.enkey="";
                }else{
                    console.log("failed");
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

    }
    
    $scope.init();


}]);
