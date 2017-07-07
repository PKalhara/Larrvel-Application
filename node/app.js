'use strict';
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');

//models
var User = require("./models/user");
var Course = require("./models/course");
var Enroll = require("./models/enroll");
var Request = require("./models/request");
var assignedLecs = require("./models/assignedLecturer");
var Project = require("./models/project");
var courseModuleGroups = require("./models/courseModuleGroups");
var courseGroupMembers = require("./models/courseGroupMembers");
var groupMessages = require("./models/groupMessages");
var Meeting =  require("./models/meeting");
var DeletedMeeting =  require("./models/deletedMeeting");
var projects = require('./routes/projects');
var lecturerNotices = require("./models/lecturerNotices");

//mongoose.connect("mongodb://localhost:27017/ptm_db");


/*************************
     Configurations
*************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {

	//console.log('${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}');


	next();
});
app.use(express.static("./app"));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


//var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
//var transporter = nodemailer.createTransport();

//var transporter = nodemailer.createTransport('smtps://dewDevops%40gmail.com:intel@smtp.gmail.com');

/*
var transporter = nodemailer.createTransport('direct',{
	debug: true,
});
*/

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'dewDevops@gmail.com',
		pass: 'intel@123'
	}
});


passport.use(new LocalStrategy(
	function(username, password, done) {


		User.getUserByUsername(username, function(err, user){

			if(err) throw err;

			if(!user){
				console.log("User not found...");
				return done(null, false, {message: 'Unknown User'});
			}else{


				console.log("User found by username...");
				return done(null, user);
			}

			// User.comparePassword(password, user.password, function(err, isMatch){

			//     if(err) throw err;

			//     if(isMatch){
			//         console.log("User found with username & password.");
			//         return done(null, user);
			//     } else {
			//         console.log("User found with username, But password is wrong.");
			//         return done(null, false, {message: 'Invalid password'});
			//     }

			// });
		});
	}
));

passport.serializeUser(function(user, done) {
    console.log("serializeUser called");
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializeUser called");
    User.getUserById(id, function(err, user) {
    	//console.log(user);
        done(err, user);
    });
});



/*************************
        Routes
*************************/

app.get('/', function (req, res) {
   res.sendfile('app/index.html');
});

app.post("/getUser",function(req,res){
    res.send(req.user);
});

app.post('/login', passport.authenticate('local',
    {
    	successRedirect:'/pass',
        failureRedirect:'/fail'
    }), function(req, res) {
    res.redirect('/as');
});


app.get('/pass', function (req, res) {
   res.send("pass");
});

app.get('/test', function (req, res) {


	var newCourse = Course({
		courseName: "DBMS",
		image: "course_05.jpg",
		enrollmentKey: "1",
        lecturerIncharge: "Mr.Prasanna",
        lecturerImage:"testi_01.png"
	});


	Course.createCourse(newCourse,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});

app.post('/postNotice', function (req, res) {

    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	var newLecturerNotices = lecturerNotices({  
		courseId: req.body.id,
        title: req.body.title,
		notice: req.body.notice,
		time: datetime
	});


	lecturerNotices.createNotices(newLecturerNotices,function (err,data) {
		//console.log(data);
    	if(err) throw err;
        res.send("pass");
	});
});

app.get('/test2', function (req, res) {


	var newEnrollment = Enroll({
		courseId: "57e171ae7d3a621708c85bd3",
		userId: "57e16fa47d3a621708c85bd2",
		userName: "prageeth"
	});


	Enroll.createNewEnroll(newEnrollment,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});

app.post('/createNewcourseModuleGroups', function (req, res) {

    
	var NewcourseModuleGroups = courseModuleGroups({
		groupName: "Clash",
        leaderStudentId: "it141",
        cgpa: "3.50",
		userId: "580f2873551e64166ccf1065",
		userName: "test",
        userImage: "testi_01.png",
        courseId: "58046638ad4aaa0020beadbb",
        lecturerAccepted: "0",
        memberCount: 1
	});

	courseModuleGroups.createNewcourseModuleGroups(NewcourseModuleGroups,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});

app.post('/createNewMessage', function (req, res) {

//    console.log(req.body.gid);
//    console.log(req.body.message);
//    console.log(req.body.name);
	var NewMessage = groupMessages({
		groupId: req.body.gid,
        message: req.body.message,
        name: req.body.name,
	});

	groupMessages.createNewGroupMessage(NewMessage,function (err,data) {
    	if(err) throw err;
         res.send("created");
	});
});

app.post('/getAllMessages', function (req, res) {
	groupMessages.getAllMessages(req.body.gid,function(err,groups){
		if(err) throw err;
       // console.log(courses);
		res.send(groups);
	});
});



app.post('/getUsers', function (req, res) {
    console.log(req.body.uid);
	User.getUsers(req.body.uid,function(err,groups){
		if(err) throw err;
       // console.log(courses);
		res.send(groups);
	});
});


app.post('/UpdateLecturerAcceptStaus', function (req, res) {
    //console.log(req.body.id);
	courseModuleGroups.UpdateLecturerAcceptStaus(req.body.id,function(err,groups){
		if(err) throw err;
       // console.log(courses);
		res.send("Success");
	});
});

app.post('/getModuleTeams', function (req, res) {
   // console.log(req.body.cid)
	courseModuleGroups.getModuleTeams(req.body.cid,function(err,groups){
		if(err) throw err;
    //   console.log(groups);
		res.send(groups);
	});
});


app.post('/createGroups', function (req, res) {


    
	var NewcourseModuleGroups = courseModuleGroups({
		groupName: req.body.groupname,
        leaderStudentId: "IT1408",
//        leaderStudentId: req.body.idno,
        cgpa: "3.55",
//        cgpa: req.body.cgpa,
		userId: req.body.userid,
		userName: req.body.name,
        userImage: "testi_01.png",
        courseId: req.body.courseid,
        lecturerAccepted: "0",
        memberCount: 1
	});

	courseModuleGroups.createNewcourseModuleGroups(NewcourseModuleGroups,function (err,data) {
		//console.log(data);
    	if(err) throw err;
        
        res.send("created");
	});
});


app.post('/createNewcourseGroupMembers', function (req, res) {

//    console.log(req.body.gid);
//    console.log(req.body.courseid);
//    console.log(req.body.userid);
    
	var NewcourseModuleGroupMembers = courseGroupMembers({
        groupId: req.body.gid,
        courseId: req.body.courseid,
		userId: req.body.userid
	});

	courseGroupMembers.createNewcourseGroupMembers(NewcourseModuleGroupMembers,function (err,data) {
		
    	if(err) throw err;
	});
    
    
});


app.get('/getAllCourses', function (req, res) {
	Course.getAllCourses(function(err,courses){
		if(err) throw err;
       // console.log(courses);
		res.send(courses);
	});
});

app.post('/getAllCourseGroups', function (req, res) {
	courseModuleGroups.getAllCourseGroups(req.body.cid,function(err,groups){
		if(err) throw err;
       // console.log(courses);
        //console.log(groups);
		res.send(groups);
	});
});

app.post('/getAllNotices', function (req, res) {
	 lecturerNotices.getAllNotices(req.body.cid,function(err,notices){
	 	if(err) throw err;
	 	res.send(notices);
	 });
});

app.get('/getAllCoursesFirstYear', function (req, res) {
	Course.getAllCoursesFirstYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});



app.get('/getAllCoursesSecondYear', function (req, res) {
	Course.getAllCoursesSecondYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});

app.get('/getAllCoursesThirdYear', function (req, res) {
	Course.getAllCoursesThirdYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});
app.get('/getAllCoursesFourthYear', function (req, res) {
	Course.getAllCoursesFourthYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});

app.post('/getModulesSingle', function (req, res) {
	console.log(req.body.id);
    Course.getModulesSingle(req.body.id,function (err,courseDetails) {
        if(err) throw err;
        res.send(courseDetails);
    });
    //console.log(req.body.id);
});

app.get('/getAllLecturers', function (req, res) {
    User.getAllLecturers(function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});

app.post('/getUsersEnrolledInCourse', function (req, res) {

	Enroll.getUsersEnrolledInCourse(req.body.cid,req.body.uType,function (err,friends) {
    	if(err) throw err;
    	res.send(friends);
	});
});

app.post('/getEnrollmentkeyByCourseId', function (req, res) {
	Course.getEnrollmentkeyByCourseId(req.body.cid,function (err,key) {
        if(err) throw err;

       // console.log(key);
    	res.send(key);

	});


});

app.post('/checkEnrollmentKey', function (req, res) {

	Course.checkEnrollmentKey(req.body.cid,function (err,count) {
    	if(err) throw err;
    	// console.log("Count: "+ count);
    	res.sendStatus(count);
	});

});

app.post('/isEnrolled', function (req, res) {
	Enroll.isEnrolled(req.body.user_id,function (err,courses) {
    	if(err) throw err;
        res.send(courses);
	});
    
    //console.log(req.body);
	
});

app.post('/isPending', function (req, res) {
   // console.log(req.body.uid);
    //console.log(req.body.cid);
	Enroll.isPending(req.body.uid,req.body.cid,function (err,courses) {
    	if(err) throw err;
        console.log(courses);
        res.send(courses);
	});
    
    //console.log(req.body);
	
});

app.post('/updatePendingStatus', function (req, res) {
   // console.log(req.body.uid);
    //console.log(req.body.cid);
	Enroll.updatePendingStatus(req.body.uid,req.body.cid,function (err,courses) {
    	if(err) throw err;
        console.log(courses);
        res.send(courses);
	});
    
    //console.log(req.body);
	
});


app.post('/updatePendingStatusInv', function (req, res) {
    console.log(req.body.uid);
    console.log(req.body.cid);
	Enroll.updatePendingStatusInv(req.body.uid,req.body.cid,function (err,courses) {
    	if(err) throw err;
        console.log(courses);
        res.send(courses);
	});
    
    //console.log(req.body);
	
});


app.post('/addNewEnrollment', function (req, res) {
    var enrollment = req.body;
    //console.log(req.body.student_id);
	Enroll.addNewEnrollment(enrollment,function (err,count) {
    	if(err) throw err;
    	res.send("New Enrollment Added");
	});
//    console.log(enrollment.course_id)
	
});

app.post('/registerUser', function (req, res) {
	//console.log(req.body.name);

	var newUser = new User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		itnum : req.body.itnum,
        email : req.body.username,
        gpa : "3.45"
	});

	User.createUser(newUser,function (err,user) {
		if(err) throw err;
	});


	res.send("pass");
});

app.post('/acceptFriendRequest', function (req, res) {
//	console.log(req.body);

	Request.acceptFriendRequest(req.body.id,function (err,user) {
		if(err) throw err;
	});
//
//
	res.send("Accepted");
});

app.post('/setRequestAcceptStatus', function (req, res) {
	//console.log(req.body);

	Enroll.setRequestAcceptStatus(req.body.id,req.body.cid,function (err,user) {
		//console.log(user)
        if(err) throw err;
	});
//
//
	res.send("Accepted");
});


app.post('/diclineFriendRequest', function (req, res) {
	//console.log(req.body);

	Request.diclineFriendRequest(req.body.id,function (err,user) {
		if(err) throw err;
	});
//
//
	res.send("Dicline");
});

app.post('/sendRequestToFriend', function (req, res) {

	var newRequest = new Request({
		requestFrom : req.body.from,
		requestTo : req.body.to,
        courseId : req.body.cid,
        gId: req.body.gid,
		status : req.body.status,
		requestFromName : req.body.fromName,
        acceptStatus: req.body.acceptStatus,
        pending: req.body.pending
	});

    
	Request.createRequest(newRequest,function (err,request) {
		if(err) throw err;
        //res.send("sucess");
	});


	res.send("pass");
});

app.post('/getReceivedRequests', function (req, res) {
	var userId =
	Request.getAllRequests(req.body.userId, req.body.status, function(err,data){
		if(err) throw err
		res.send(data)
	})
});

app.post('/getGroupCount', function (req, res) {
	
 //   console.log(req.body.gid);
	Request.getGroupCount(req.body.gid, function(err,data){
		if(err) throw err
       // console.log(data);
        
		res.send( data.toString())
	})
});

app.post('/getGroupId', function (req, res) {
console.log(req.body.userId);
console.log(req.body.courseId);
	Request.getGroupId(req.body.userId, req.body.courseId, function(err,data){
		if(err) throw err
		res.send(data)
	})
});

app.post('/getGroupIdFromGroup', function (req, res) {

	courseModuleGroups.getGroupIdFromGroup(req.body.userid, req.body.courseid, function(err,data){
		if(err) throw err
		res.send(data)
	})
});


app.post('/isGroupFormed', function (req, res) {
    
    
//	Request.isGroupFormed(req.body.userId, req.body.status, function(err,data){
//		if(err) throw err
//		res.send(data)
//	})
});

app.post('/getMyFriendsRequests', function (req, res) {
//	console.log(req.body);
	Request.getMyFriendsRequests(req.body.userId, function(err,data){
		if(err) throw err
		res.send(data)
//        console.log(data);
	})
});


app.get('/getAllLecturers', function (req, res) {
	User.getAllLecturers(function(err,lecturers){
		if(err) throw err;
		console.log(lecturers);
		res.send(lecturers);
	});
});

app.post('/getLecturerAcceptStaus', function (req, res) {
    //console.log(req.body.gid);
	courseModuleGroups.getLecturerAcceptStaus(req.body.gid,function(err,lecturers){
		if(err) throw err;
       // console.log(lecturers);
		res.send(lecturers);
	});
});


app.get('/displayAllModules', function (req,res) {
   Course.displayAllCourses(function (err,courses) {
	   if(err) throw err;
	    res.send(courses);
   });
});

app.post('/getAssigenedLecturers', function (req,res) {
    var courseName = req.body.courseName;
    assignedLecs.getLecturersAssignedToCourse(courseName,function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});




app.use('/projects', projects);



app.post('/assignLecturer', function (req,res) {
	var newAsgnlec = new assignedLecs({
		courseName : req.body.courseName,
		userName : req.body.userName,
		post : req.body.post,
		image : req.body.image
	});

	assignedLecs.assignNewLecturer(newAsgnlec,function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});



app.get('/getAllAssigenedLecturers', function (req,res) {
	assignedLecs.getallLecturersAssigned(function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});

app.post('/getAssignedLecturers', function (req, res) {
	assignedLecs.getLecturersAssigned(req.body.courseName,function(err,lecturers){
		if(err) throw err;
		res.send(lecturers);
	})
});


//Student Services

app.post('/getGroupCountMembers', function (req, res) {
    
	courseGroupMembers.getGroupCount(req.body.gid, function(err,data){
		if(err) throw err
		res.send({count:data.toString(),gid:req.body.gid})
	})
});

app.post('/getGroupMembers', function (req, res) {
    
	courseGroupMembers.getGroupMembers(req.body.gid, function(err,data){
		if(err) throw err
		res.send(data)
	})
});

app.post('/updateMemberCount', function (req, res) {
    //console.log(req.body.gid);
    
	courseModuleGroups.updateMemberCount(req.body.gid, function(err,data){
		if(err) throw err
		//res.send("updated");
	})
});

app.post('/getAcceptedStatus', function (req, res) {
    //console.log(req.body.gid);
    
	Request.getAcceptedStatus(req.body.uid,req.body.cid, function(err,data){
		if(err) throw err
		res.send(data);
	})
});


app.post('/getmemberCount', function (req, res) {
    //console.log(req.body.gid);
    
	courseModuleGroups.getmemberCount(req.body.gid, function(err,data){
		if(err) throw err
       // console.log(data);
		res.send(data.toString());
	})
    
});

app.post('/getModulesInCharge', function (req, res) {
    
    Course.getModulesInCharge(req.body.lecName,function (err,data) {
		if(err) throw err;
        res.send(data);
	});

});

app.post('/getModulesAssignedForLecturer', function (req, res) {

	assignedLecs.getModulesAssignedForLecturer(req.body.lecName,function (err,data) {
		if(err) throw err;
		res.send(data);
	});

});

app.post('/getModulesAssignedForSupervisor', function (req, res) {

	assignedLecs.getModulesAssignedForSupervisor(req.body.lecName,function (err,data) {
		if(err) throw err;
		res.send(data);
	});

});

app.post('/assignLecturerForModule', function (req, res) {

	Course.assignLecturerForModule(req.body.moduleName,req.body.lecName,function (err) {
		if(err) throw err;
		res.send("pass");
	});

});

app.post('/changeEnrolmentKey', function (req, res) {

    Course.changeEnrolmentKey(req.body.moduleName,req.body.newKey,function (err) {
        if(err) throw err;
        res.send("pass");
    });

});

app.post('/addNewLecturer', function (req, res) {

	User.addNewLecturer(function (err) {
		if(err) throw err;
		res.send("pass");
	});

});


/*
 * Send meeting requests
 * */
app.post('/sendMeetingReq', function (req,res) {
	console.log("to");
    console.log(req.body.to);
	console.log("from");
	console.log(req.body.from);

	var newMeeting = new Meeting({
		header: req.body.subject,
		body: req.body.body,
		date: req.body.date,
		time : req.body.time,
		from : req.body.from,
		to : req.body.to,
		venue:req.body.venue,
		year :req.body.year,
		month:req.body.month,
		status:"accepted"
	});

	Meeting.createMeeting(newMeeting,function (err,data) {
		//console.log(data);
		if(err) throw err;
	});

	var mailOptions = {
		from: 'SLIIT TM portal👥 <comtale.noreply@gmail.com>', // sender address
		to: req.body.to, // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.body, // plaintext body
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

});



app.post('/GetDeletedMeetings', function (req,res) {

	console.log(req.body.header);
	console.log(req.body.body);
	console.log(req.body.date);
	console.log(req.body.time);
	
	var newDeletedMeeting = new DeletedMeeting({
		header: req.body.header,
		body: req.body.body,
		date: req.body.date,
		time: req.body.time,
		from: req.body.from,
		to: req.body.to,
		venue: req.body.venue
	});

	DeletedMeeting.createDelMeeting(newDeletedMeeting, function (err, data) {
		//console.log(data);
		if (err){
		  console.log(err);
		}
	});
});
/*
 * API end point to get all meetings
 * */
app.post('/getMeetings', function (req,res) {

	Meeting.getAllMeetings(req.body.user,req.body.date	,function (err,meetings) {
		if(err) throw err;
		res.send(meetings);
	});
});

app.post('/getMeetingsForMonth', function (req,res) {

	Meeting.getMeetingsForMonth(req.body.user,req.body.date,req.body.month,function (err,meetings) {
		if(err) throw err;
		res.send(meetings);
		console.log(meetings);
	});
});



app.post('/findMeetingById', function (req,res) {

	Meeting.findMeetingByID(req.body.id,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});


app.post('/updateMeetingAppointment', function (req, res) {
	console.log(req.body.venue);

	Meeting.updateAppointment(req.body._id,req.body.header,req.body.body,req.body.date,req.body.time,req.body.venue,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});


app.post('/deleteMeeting', function (req,res) {

	console.log(req.body._id);
	Meeting.DeleteAppointment(req.body._id,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});

app.post('/removeAssignLecturers', function (req,res) {

	assignedLecs.DeleteLecturer(req.body._id,function (err,lecturer) {
		if(err) throw err;
		res.send(lecturer);
	});
});


app.post('/addLecturerFormSubmit', function (req, res) {
	var randomPassword = Math.random().toString(36).slice(-8);
	console.log(req.body.phone);
	var newUser = new User({
		name: req.body.firstname+" "+req.body.lastname,
		phone: req.body.phone,
		email : req.body.email,
		staffNumber: req.body.staffNumber,
		post : req.body.post,
        userType:"lecturer",
		username:req.body.username,
		password: randomPassword,
		image:"img/lecturers/default.jpg"
	});

	User.createLecturer(newUser,function (err,data) {
		//console.log(data);
		if(err) throw err;
        res.send("pass");
	});

	//send mail to newly added lecturer
	var mailOptions = {
		from: 'SLIIT TM portal👥 <comtale.noreply@gmail.com>', // sender address
		to: req.body.email, // list of receivers
		subject: 'Temporary username and password for SLIIT TM portal login', // Subject line
		text: 'You have been added to SLIIT TM portal as a lecturer.\nYour temporary username - '+req.body.username+' and password - '+randomPassword, // plaintext body
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
});

app.get('/getAllLecturersNames', function (req, res) {
	User.getAllLecturersNames(function(err,lecturers){
		if(err) throw err;
		res.send(lecturers);
	});
});

app.post('/createModuleFormSubmit', function (req, res) {

	var newCourse = new Course({
		courseName: req.body.name,
        abbreviation: req.body.abbr,
		description : req.body.description,
        enrollmentKey: req.body.enkey,
		year : req.body.year,
		semester:req.body.semester,
        lecInCharge:req.body.lecInCharge,
		status:"Active",
        maxGroupMembers:"4",
        assignmentCriteria:["not set","not set","not set"]
	});

	Course.createCourse(newCourse,function (err,data) {
		//console.log(data);
		if(err) throw err;
		res.send("pass");
	});


    User.getEmailOfUserByName(req.body.lecInCharge,function (err,data) {
       
        var email=data.email;
        var mailOptions = {
            from: 'SLIIT TM portal👥 <comtale.noreply@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Lecturer in Charge', // Subject line
            text: 'You have been assigned as the lecturer in charge of '+req.body.name+' module', // plaintext body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    });

	//send mail to newly added lecturer

});


app.post('/changeMaxGroupMembers', function (req, res) {

    Course.changeMaxGroupMembers(req.body.moduleName,req.body.maxGroupMembers,function (err) {
        if(err) throw err;
        res.send("pass");
    });
});

app.post('/changeAssignmentCriteria', function (req, res) {
    //console.log(req.body.moduleName);
    Course.changeAssignmentCriteria(req.body.moduleName,req.body.midEv,req.body.finalEv,req.body.finalDoc,function (err) {
        if(err) throw err;
        res.send("pass");
    });
});

// app.get('*',ensureAuthenticated , function(req, res) {
//   	console.log("access granted. secure stuff happens here");
// });



// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//     	//res.redirect('/auth/google');
//         return next();
//     } else {
//         //req.flash('error_msg','You are not logged in');
//         res.redirect('/login');
//     }
// }






/*************************
        Server
*************************/

app.listen(8080);
console.log("Express app running on port 8080");
module.exports = app;
