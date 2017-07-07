'use strict';

var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	requestFrom: String,
	requestTo: String,
    courseId:String,
    gId:String,
	status: String,
	requestFromName: String,
    acceptStatus: String,
    pending: String
});

var Request = module.exports = mongoose.model('Request',RequestSchema);


module.exports.createRequest = function(newRequest, callback){
    newRequest.save(callback);
}

module.exports.getAllRequests = function(userId, status, callback){
    Request.find({ requestTo:userId , status:status }, callback);
}

module.exports.getFriendReceivedRequests = function(id,callback){
	Request.find({ requestTo:id },callback);
}

module.exports.getMyFriendsRequests = function(id,callback){
	Request.find({ requestFrom:id },callback);
}

module.exports.getGroupId = function(userId,courseid,callback){
	Request.find({ requestFrom:userId , courseId:courseid , acceptStatus:"1" },callback);
}
module.exports.getAcceptedStatus = function(userId,courseid,callback){
	Request.find({ requestFrom:userId , courseId:courseid },callback);
}
module.exports.acceptFriendRequest = function(id,callback){
	Request.update({ _id:id },{ $set:{ status:"1",acceptStatus:"1"}},callback);
}

module.exports.diclineFriendRequest = function(id,callback){
	Request.update({ _id:id },{ $set:{ status:"1"}},callback);
}


module.exports.getGroupCount = function(gid, callback){
	Request.count( { gId:gid , acceptStatus:"1" },callback);
}