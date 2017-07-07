/**
 * Created by DewmiR on 10/17/2016.
 */


lectApp.controller('supervisorController', ['$scope','$http','$location','sweet', function($scope,$http,$location, sweet) {


    $scope.init = function () {

        $scope.date = new Date();
        $scope.time = new Date();
        $scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.maxDate = moment().add(1, 'month');

        $scope.modInChg=false;
        $scope.getCurrentUser();
        $scope.name="";
        $scope.lecInchg=[];
        $scope.modInChgName=[];
        $scope.modInChgID=[];


        $scope.alllecModules=[];
        $scope.alllecModulesDetails=[];
        $scope.supModDetails=[];
        $scope.allSupervisorModules=[];
        $scope.lec=false;
        $scope.mod=false;

        $scope.meetings = [];
        $scope.meetingsForMonth = [];
        $scope.getAllMeetingsForMonths();

        $scope.from="";
        $scope.to="";
        $scope.date="";
        $scope.time="";
        $scope.venue="";
        $scope.subject="";
        $scope.body="";
        var d = new Date();
        $scope.month = d.getMonth()+1;
        $scope.year = d.getFullYear();
        $scope.day = d.getDate();
        $scope.today = $scope.month+'/'+$scope.day+'/'+$scope.year;
        $scope.status="Pending";

        $scope.allMeetings=[];
        $scope.getAllMeetings();

        $scope.appoinment=[];

        $scope.appTo="";
        $scope.appDate="";
        $scope.appTime="";
        $scope.appVenue="";
        $scope.appHeader="";
        $scope.appBody="";

        $scope.errorMsg="";
        $scope.error="false";
        $scope.errorTime="false";
        $scope.errorMsgTime="";
        $scope.errorVenue="false";
        $scope.errorMsgVenue="";
        $scope.errorSub="false";
        $scope.errorMsgSub="";
        $scope.errorBody="false";
        $scope.errorMsgBody="";
        $scope.errorTo="";
        $scope.errorMsgTo="";
        
        $scope.obj={};


   
    };



    /*
    * Get Current User
    * */
    $scope.getCurrentUser=function () {

        $http.post('/getUser').success(
            function(data){
                $scope.name=data.name;
                $scope.getModulesInCharge();
                $scope.getLecturingModulesAssigned();
                $scope.getSupModulesAssigned();
            }
        ).error(
            function(error){
                console.log(error)
            }
        );

};


    /*
     * Get Modules in charge
     * */
    $scope.getModulesInCharge=function () {
        $http.post('/getModulesInCharge',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.modInChg="true";
                }else{
                    Array.prototype.push.apply($scope.lecInchg, data);
                    angular.forEach($scope.lecInchg, function(value){
                        $scope.modInChgName.push(value);
                        //$scope.modInChgName.push(value._id);

                     });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };


    /*
    * Get all lecturing modules assigned
    * */
    $scope.getLecturingModulesAssigned=function () {
        $http.post('/getModulesAssignedForLecturer',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.lec="true";
                }else{
                    Array.prototype.push.apply($scope.alllecModulesDetails, data);
                    angular.forEach($scope.alllecModulesDetails, function(value){
                        $scope.alllecModules.push(value);

                    });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };


    /*
     * Get all Supervisor modules assigned
     * */
    $scope.getSupModulesAssigned=function () {
        $http.post('/getModulesAssignedForSupervisor',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.mod="true";
                }else{
                    Array.prototype.push.apply($scope.supModDetails, data);
                    angular.forEach($scope.supModDetails, function(value){
                        $scope.allSupervisorModules.push(value);

                    });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };



    /*
    * Get monthly meeting schedule
    * */
    $scope.getMeetingAppoinments = function () {
        $http({
            method: 'GET',
            url:'/getMeetings'
        }).then(
            function success(response) {
                Array.prototype.push.apply($scope.meetings, response.data);
            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );

    };


    /*
    * Send meeting request
    * */

    $scope.sendMeetingRequest=function () {

        $scope.to=$scope.mailto;
        $scope.date="12/28/2016";
        $scope.time=$scope.mailtime;
        $scope.venue=$scope.mailvenue;
        $scope.subject=$scope.mailsubject;
        $scope.body=$scope.mailbody;
        $scope.from=$scope.name;

        if( angular.isUndefined($scope.mailvenue) || $scope.mailvenue == ""  || angular.isUndefined($scope.mailtime) ||
            $scope.mailtime == "" || $scope.mailto == "" || angular.isUndefined($scope.mailto) )
        {

            if(angular.isUndefined($scope.mailvenue) || $scope.mailvenue == "" ){
                $scope.errorVenue="true";
                $scope.errorMsgVenue="*Invalid Venue";
            }else{
                $scope.errorVenue="false";
                $scope.errorMsgVenue="";
            }

            if(angular.isUndefined($scope.mailtime) || $scope.mailtime == "" ){
                $scope.errorTime="true";
                $scope.errorMsgTime="*Invalid Time";
            }else{
                $scope.errorTime="false";
                $scope.errorMsgTime="";
            }

            if(angular.isUndefined($scope.mailto) || $scope.mailto == "" ){
                $scope.errorTo="true";
                $scope.errorMsgTo="*Invalid Recipient";
            }else{
                $scope.errorTo="false";
                $scope.errorMsgTo="";
            }

        }else if($scope.mailto != "" || angular.isDefined($scope,mailto)) {

            $scope.errorVenue="false";
            $scope.errorMsgVenue="";
            $scope.errorTime="false";
            $scope.errorMsgTime="";
            $scope.errorVenue="false";
            $scope.errorMsgVenue="";

            $scope.atpos = $scope.to.indexOf("@");
            $scope.dotpos = $scope.to.lastIndexOf(".");

            if ($scope.atpos < 1 || $scope.dotpos < $scope.atpos + 2 || $scope.dotpos + 2 >= $scope.to.length) {
                $scope.errorTo = "true";
                $scope.errorMsgTo = "*Invalid Email";

            } else {
                $scope.errorTo = "";
                $scope.errorMsgTo = "";

                if ((angular.isUndefined($scope.mailsubject) || $scope.mailsubject == "" ) && (angular.isUndefined($scope.mailbody) || $scope.mailbody == "")) {

                    sweet.show({
                        title: 'Confirm',
                        text: 'Send without Subject and Message Body?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Yes!',
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {
                        if (isConfirm) {

                            $http.post('/sendMeetingReq', {

                                from: $scope.from,
                                to: $scope.to,
                                date: $scope.date,
                                time: $scope.time,
                                venue: $scope.venue,
                                subject: " ",
                                body: " ",
                                month: $scope.month,
                                year: $scope.year,
                                status: $scope.status


                            }).success(
                                function (data) {
                                    // $scope.name=data.name;


                                    $scope.sentMail();
                                }
                            ).error(
                                function (error) {
                                    console.log(error)
                                }
                            );
                            $scope.mailto ="";
                            $scope.maildate = "";
                            $scope.mailtime = "";
                            $scope.mailvenue= "";
                            $scope.mailsubject= "";
                            $scope.mailbody= "";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";
                            $scope.errorTime="false";
                            $scope.errorMsgTime="";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";
                            $('#myModal5').modal('hide');
                            sweet.show('Sent!', 'Message Sent', 'success');
                        } else {
                            sweet.show('Cancelled', ' ', 'error');
                        }
                    });


                }

                else if(angular.isUndefined($scope.mailsubject) || $scope.mailsubject == "") {

                    sweet.show({
                        title: 'Confirm',
                        text: 'Send without Subject?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Yes!',
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {
                        if (isConfirm) {

                            $http.post('/sendMeetingReq', {

                                from: $scope.from,
                                to: $scope.to,
                                date: $scope.date,
                                time: $scope.time,
                                venue: $scope.venue,
                                subject: " ",
                                body: $scope.body,
                                month: $scope.month,
                                year: $scope.year,
                                status: $scope.status


                            }).success(
                                function (data) {
                                    // $scope.name=data.name;
                                    console.log(data);
                                    $scope.sentMail();
                                }
                            ).error(
                                function (error) {
                                    console.log(error)
                                }
                            );

                            $scope.mailto ="";
                            $scope.maildate = "";
                            $scope.mailtime = "";
                            $scope.mailvenue= "";
                            $scope.mailsubject= "";
                            $scope.mailbody= "";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";
                            $scope.errorTime="false";
                            $scope.errorMsgTime="";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";

                            $('#myModal5').modal('hide');
                            sweet.show('Sent!', 'Message Sent', 'success');
                        } else {
                            sweet.show('Cancelled', ' ', 'error');
                        }
                    });
                }
                else if(angular.isUndefined($scope.mailbody) || $scope.mailbody == ""){

                    sweet.show({
                        title: 'Confirm',
                        text: 'Send without Message Body?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Yes!',
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {
                        if (isConfirm) {

                            $http.post('/sendMeetingReq', {

                                from: $scope.from,
                                to: $scope.to,
                                date: $scope.date,
                                time: $scope.time,
                                venue: $scope.venue,
                                subject: $scope.subject,
                                body: " ",
                                month: $scope.month,
                                year: $scope.year,
                                status: $scope.status


                            }).success(
                                function (data) {


                                    console.log(data);
                                }
                            ).error(
                                function (error) {
                                    console.log(error)
                                }
                            );
                            $scope.mailto ="";
                            $scope.maildate = "";
                            $scope.mailtime = "";
                            $scope.mailvenue= "";
                            $scope.mailsubject= "";
                            $scope.mailbody= "";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";
                            $scope.errorTime="false";
                            $scope.errorMsgTime="";
                            $scope.errorVenue="false";
                            $scope.errorMsgVenue="";
                            $('#myModal5').modal('hide');
                            sweet.show('Sent!', 'Message Sent', 'success');
                        } else {
                            sweet.show('Cancelled', ' ', 'error');
                        }
                    });
                }

                else{
                    $http.post('/sendMeetingReq', {

                        from: $scope.from,
                        to: $scope.to,
                        date: $scope.date,
                        time: $scope.time,
                        venue: $scope.venue,
                        subject: $scope.subject,
                        body: $scope.body,
                        month: $scope.month,
                        year: $scope.year,
                        status: $scope.status


                    }).success(
                        function (data) {

                        }
                    ).error(
                        function (error) {
                            console.log(error)
                        }

                    );

                    $scope.mailto ="";
                    $scope.maildate = "";
                    $scope.mailtime = "";
                    $scope.mailvenue= "";
                    $scope.mailsubject= "";
                    $scope.mailbody= "";
                    $scope.errorVenue="false";
                    $scope.errorMsgVenue="";
                    $scope.errorTime="false";
                    $scope.errorMsgTime="";
                    $scope.errorVenue="false";
                    $scope.errorMsgVenue="";
                    $('#myModal5').modal('hide');
                    sweet.show('Sent successfully');
                }


            }
        }
    };



    /*
     * Get Current User
     * */
     $scope.getAllMeetings=function () {

         $http.post('/getUser').success(
             function(data){
                 $scope.name=data.name;
                 console.log($scope.today);

                 $http.post('/getMeetings',{
                     user : $scope.name,
                     date :$scope.today
                 }).success(
                     function(data){
                         $scope.allMeetings=[];
                         Array.prototype.push.apply($scope.allMeetings, data);
                         console.log($scope.allMeetings);
                         
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

     };


    $scope.getAllMeetingsForMonths=function () {
        $http.post('/getUser').success(
            function(data){

                $http.post('/getMeetingsForMonth',{
                    user : $scope.name,
                    month :$scope.month,
                    date:$scope.today
                }).success(
                    function(data){
                        Array.prototype.push.apply($scope.meetings, data);
                        console.log($scope.meetings);
                        angular.forEach($scope.meetings, function(value){
                         $scope.meetingsForMonth.push(value.courseName);
                            console.log($scope.meetingsForMonth);

                         });

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

    };

    
    $scope.getAppDeatils=function (id) {
        console.log(id);
        $http.post('/findMeetingById',{
            id : id
        }).success(
            function(data){
                $scope.appoinment=data;
                console.log(data);
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };

    $scope.updateAppoinment=function (id) {
    //Validation

       if($scope.appoinment.date.length==0 || $scope.appoinment.time.length ==0 || $scope.appoinment.venue.length ==0 ||$scope.appoinment.header.length ==0 || $scope.appoinment.body.length ==0) {

     if($scope.appoinment.date.length == 0){
         $scope.error="true";
         $scope.errorMsg="* Invalid date";
     }else{
         $scope.error="false";
         $scope.errorMsg="";
     }
      if($scope.appoinment.time.length == 0){
         $scope.errorTime="true";
         $scope.errorMsgTime="* Invalid Time";
     }else{
          $scope.errorTime="false";
          $scope.errorMsgTime="";
      }
      if($scope.appoinment.venue.length == 0){
          $scope.errorVenue="true";
          $scope.errorMsgVenue= "*Invalid venue";
     }else{
          $scope.errorVenue="false";
          $scope.errorMsgVenue="";
         }
     if($scope.appoinment.header.length == 0){
          console.log($scope.appoinment.header.length);
          $scope.errorSub="true";
          $scope.errorMsgSub="*Message without subject";
    }else{
          $scope.errorSub="false";
         $scope.errorMsgSub="";
         }
    if($scope.appoinment.body.length == 0){
         console.log($scope.appoinment.body.length);
          $scope.errorBody="true";
          $scope.errorMsgBody="*Message without body";
    }else{
          $scope.errorBody="false";
           $scope.errorMsgBody="";
           }
       }
     else {

         $scope.errorSub="false";
         $scope.errorMsgSub="";
         $scope.error="false";
         $scope.errorMsg="";
         $scope.errorTime="false";
         $scope.errorMsgTime="";
         $scope.errorVenue="false";
         $scope.errorMsgVenue="";
         $scope.errorBody="false";
         $scope.errorMsgBody="";

         $http.post('/updateMeetingAppointment',{
             _id : id,
             header:$scope.appoinment.header,
             body:$scope.appoinment.body,
             date:$scope.appoinment.date,
             time : $scope.appoinment.time,
             venue:$scope.appoinment.venue


         }).success(
             function(data){
                 console.log(data);
                 $scope.getAllMeetings();
                 $scope.success();
             }
         ).error(
             function(error){
                 console.log(error)
             }

         );

           $scope.error="false";
           $scope.errorMsg="";
           $scope.errorTime="false";
           $scope.errorMsgTime="";
           $scope.errorVenue="false";
           $scope.errorMsgVenue="";
            $scope.error="false";
            $scope.errorMsg="";
           $scope.errorBody="false";
           $scope.errorMsgBody="";
           $scope.errorSub="false";
           $scope.errorMsgSub="";
          $('#myModal5').modal('hide')

    }

};


    $scope.confirmCancel = function(id) {


        console.log(id);

        sweet.show({
            title: 'Confirm',
            text: 'Cancel Appointment?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, cancel Appointment!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {

                $http.post('/findMeetingById',{
                    id : id
                }).success(
                    function(data){
                        $scope.appoinment=data;


                        $http.post('/GetDeletedMeetings',{
                            header:$scope.appoinment.header,
                            body:$scope.appoinment.body,
                            date:$scope.appoinment.date,
                            time : $scope.appoinment.time,
                            venue:$scope.appoinment.venue,
                            to : $scope.appoinment.to,
                            from:$scope.appoinment.from

                        }).success(
                            function(data){
                                console.log(data);
                                $scope.success();
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
                console.log(id);
                $http.post('/deleteMeeting',{
                    _id : id
                }).success(
                    function(data){
                        console.log(data);
                        $scope.getAllMeetings();
                    }
                ).error(
                    function(error){
                        console.log(error)
                    }

                );


                sweet.show('Deleted!', 'The appointment has been cancelled.', 'success');
            } else {
                sweet.show('Cancelled', ' ', 'error');
            }
        });
    };


    $scope.discardEmail=function () {

        sweet.show({
            title: 'Confirm',
            text: 'Discard Appointment?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, discard Appointment!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $('#myModal5').modal('hide');
                sweet.show('Discarded!', 'The appointment discarded sucessfully', 'success');
            } else {
                sweet.show('Cancelled', ' ', 'error');
            }
        });
    };

    $scope.success = function() {
        sweet.show('Updated successfully');
    };




    $scope.sentMail = function() {
        sweet.show('Sent successfully');
    };

    $scope.init();


}]);