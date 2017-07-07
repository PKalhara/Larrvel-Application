'use strict';

var mongoose = require('mongoose');

var EnrollSchema = new mongoose.Schema({
	courseId: String,
	userId: String,
	userName: String,
	userImage: String,
    userType : String,
    pendingStatus: String,
    requestAcceptStatus : String
});

var Enroll = module.exports = mongoose.model('Enroll',EnrollSchema);


module.exports.createNewEnroll = function(newEnroll, callback){
    newEnroll.save(callback);
};

module.exports.getUsersEnrolledInCourse = function(courseId,userType, callback){
    Enroll.find({courseId: courseId},callback);
};


module.exports.addNewEnrollment = function(enrollment,callback){

     var enroll =new Enroll();
      enroll.courseId = enrollment.course_id;
      enroll.userId = enrollment.student_id;
      enroll.userName = enrollment.student_name;
      enroll.userImage = "testi_02.png";
      enroll.pendingStatus = "0";
      enroll.requestAcceptStatus = "0";
      enroll.save(callback);
};

module.exports.isEnrolled = function(userId, callback){
    Enroll.find({ userId: userId },callback);
};

module.exports.isPending = function(userId,cid,callback){
    Enroll.find({ userId: userId,courseId:cid },callback);
};


module.exports.setRequestAcceptStatus = function(id,cid,callback){
	Enroll.update({ userId:id,courseId:cid },{ $set:{ requestAcceptStatus:"1" }},callback);
};

module.exports.updatePendingStatus = function(id,cid,callback){
	Enroll.update({ userId:id,courseId:cid },{ $set:{ pendingStatus:"0" }},callback);
};

module.exports.updatePendingStatusInv = function(id,cid,callback){
	Enroll.update({ userId:id,courseId:cid },{ $set:{ pendingStatus:"1" }},callback);
};

