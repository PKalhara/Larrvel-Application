'use strict';

var mongoose = require('mongoose');

var courseGroupMembersSchema = new mongoose.Schema({
    //groupName:String,
    groupId:String,
    courseId:String,
    userId:String
});

var courseGroupMembers = module.exports = mongoose.model('courseGroupMembers',courseGroupMembersSchema);


module.exports.createNewcourseGroupMembers = function(newcourseGroupMembers, callback){
    newcourseGroupMembers.save(callback);
};

module.exports.getGroupCount = function(gid,callback){
    courseGroupMembers.count({ groupId:gid },callback);
}

module.exports.getGroupMembers = function(gid,callback){
    courseGroupMembers.find({ groupId:gid },callback);
}

//module.exports.getLecturerAcceptStaus = function(gid,callback){
//    courseGroupMembers.find({ groupId:gid },callback);
//}

