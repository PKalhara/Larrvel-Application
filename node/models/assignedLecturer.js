/**
 * Created by DewmiR on 9/30/2016.
 */
'use strict';

var mongoose = require('mongoose');

var asgnlecSchema = new mongoose.Schema({
    courseName: String,
    userName: String,
    post: String,
    image : String
});

var Asgnlec = module.exports = mongoose.model('Asgnlec',asgnlecSchema);

module.exports.getLecturersAssignedToCourse = function( courseName,callback){
    Asgnlec.find({courseName:courseName},callback);
};

module.exports.assignNewLecturer = function(newEnroll, callback){
    newEnroll.save(callback);
};

module.exports.getallLecturersAssigned = function( callback){
    Asgnlec.find({},callback);
};


module.exports.getLecturersAssigned = function(courseName,callback){
    Asgnlec.find({courseName:courseName},callback);
};

module.exports.getModulesAssignedForLecturer = function(userName,callback){
    Asgnlec.find({userName:userName,post:"Lecturer"},callback);
};

module.exports.getModulesAssignedForSupervisor = function(userName,callback){
    Asgnlec.find({userName:userName,post:"Supervisor"},callback);
};

module.exports.DeleteLecturer = function(_id,callback){
    Asgnlec.remove( { _id :_id },callback );
};
