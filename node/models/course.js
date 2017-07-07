'use strict';

var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	courseName: String,
	semester: String,
	year: String,
	image: String,
	enrollmentKey: String,
    lecturerImage: String,
    status: String,
    lecInCharge: String,
    lastUpdated: String,
    created: String,
    abbreviation: String,
    description: String,
    maxGroupMembers: String,
    assignmentCriteria: [String]
});

var Course = module.exports = mongoose.model('Course',CourseSchema);


module.exports.createCourse = function(newCourse, callback){
    newCourse.save(callback);
}

module.exports.getAllCourses = function(callback){
    Course.find({},callback);
}

module.exports.getAllCoursesFirstYear = function(callback){
	var year = '1st Year';
	Course.find({},callback);
}

module.exports.getAllCoursesSecondYear = function(callback){
    var year = '2nd Year';
	Course.find({ year:year },callback);
}

module.exports.getAllCoursesThirdYear = function(callback){
    var year = '3rd Year';
	Course.find({ year:year },callback);
}

module.exports.getAllCoursesFourthYear = function(callback){
    var year = '4th Year';
	Course.find({ year:year },callback);
}

module.exports.getModulesSingle = function(id,callback){
    Course.findById(id,callback);
}

module.exports.checkEnrollmentKey = function(key, callback){
	Course.count( { enrollmentKey:key },callback);
} 

module.exports.getEnrollmentkeyByCourseId = function(id, callback){
    Course.find({ _id:id }, callback);
    //Course.findById(id, callback);
};


module.exports.displayAllCourses = function(callback){
    Course.find({},callback);
};

module.exports.getCourseNameById = function(cid,callback) {
    Course.find({ _id:cid }, callback);
}
module.exports.assignLecturerForModule = function(moduleName,lecName,callback){
    Course.update({courseName:moduleName}, {$set: { lecInCharge: lecName }}, {upsert: true}, callback);
}

/**
 * change enrollment key of module
 * @param moduleName
 * @param newKey
 * @param callback
 */
module.exports.changeEnrolmentKey = function(moduleName,newKey,callback){
    Course.update({courseName:moduleName}, {$set: { enrollmentKey: newKey }}, {upsert: true}, callback);
}

/**
 * get lec in charge of module
 * @param lecInCharge
 * @param callback
 */
module.exports.getModulesInCharge = function(lecInCharge,callback){
    Course.find({lecInCharge:lecInCharge},callback);
}

/**
 * change maximum group members
 * @param moduleName
 * @param maxGroupMembers
 * @param callback
 */
module.exports.changeMaxGroupMembers = function(moduleName,maxGroupMembers,callback){
    Course.update({courseName:moduleName},{ maxGroupMembers: maxGroupMembers }, callback);
}

/**
 * change assignment criteria
 * @param moduleName
 * @param midEv
 * @param finalEv
 * @param finalDoc
 * @param callback
 */
module.exports.changeAssignmentCriteria = function(moduleName,midEv,finalEv,finalDoc,callback){
    Course.update({courseName:moduleName},{ assignmentCriteria: [midEv,finalEv,finalDoc] }, callback);
}

