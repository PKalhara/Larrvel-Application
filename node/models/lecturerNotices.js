'use strict';

var mongoose = require('mongoose');

var lecturerNoticesSchema = new mongoose.Schema({
    courseId:String,
    title:String,
    notice:String,
    time:String
});

var lecturerNotices = module.exports = mongoose.model('lecturerNotices',lecturerNoticesSchema);


module.exports.createNotices = function(newLecturerNotices, callback){
    newLecturerNotices.save(callback);
};

module.exports.getAllNotices = function(cid,callback){
    lecturerNotices.find({ courseId:cid },callback);
}