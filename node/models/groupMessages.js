'use strict';

var mongoose = require('mongoose');

var groupMessagesSchema = new mongoose.Schema({
    groupId:String,
    message:String,
    name:String
});

var groupMessages = module.exports = mongoose.model('groupMessages',groupMessagesSchema);


module.exports.createNewGroupMessage = function(newcourseGroups, callback){
    newcourseGroups.save(callback);
};

module.exports.getAllMessages = function(gid,callback){
    groupMessages.find({ groupId:gid },callback);
}
//
//module.exports.updateMemberCount = function(gid,callback){
//   // console.log(gid);
//	courseModuleGroups.update({ _id:gid },{ $inc:{ memberCount:1} },callback);
//}
//
//module.exports.getmemberCount = function(gid,callback){
//    courseModuleGroups.count({ _id:gid },callback);
//}
//
//module.exports.getGroupIdFromGroup = function(userId,courseid,callback){
//	courseModuleGroups.find({ userId:userId , courseId:courseid },callback);
//}
//
//module.exports.getLecturerAcceptStaus = function(gid,callback){
//    courseModuleGroups.findById(gid,callback);
//}