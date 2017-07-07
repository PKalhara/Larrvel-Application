'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
	name: String,
    description: String,
    notices: [{
        title: String,
        description: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        created_at: { type: Date, default: Date.now },
        name: String
    }],
    assigned: String,
    created: { type: Date, default: Date.now }
});



var Project = module.exports = mongoose.model('Project',ProjectSchema);
//var ProjectOfCourse = module.exports = mongoose.model('ProjectOfCourse',ProjectOfCourseSchema);


module.exports.createProject = function(newproject, callback){
    newproject.save(callback);
}


module.exports.getAllPrpjects = function(callback){
	Project.find({},callback);
}

module.exports.getAllPrpjects2 = function(callback){
    Project.find({assigned:"0"},callback);
}

module.exports.getProjectData = function(pid,callback){
	Project.find({'_id':pid},callback);
}

module.exports.postNoticeForProject = function(user,project,title,description,callback){
	Project.findByIdAndUpdate(
        project,
        { 
            $push: {
                "notices": {
                    "title": title,
                    "description": description,
                    "by": user,
                    "name": user.name            
                }
            }
        },
        {
            safe: true, 
            upsert: true, 
            new : true
        },
        callback
    );
}

module.exports.changeAssignedStatus = function(project,callback){
    Project.update(project,{assigned:"1"},callback);
}

module.exports.getProjectNotices = function(project,callback){

    // console.log("Project came here :"+ project.name)

    //Project.find(project).select('notices').exec(callback);

    Project.find({name:project},callback);
}

/*
module.exports.declineBit = function(bid,poc,callback){
    ProjectOfCourse.update(
        {
            'bids._id':bid._id
        },
        { 
            $set: {   
                'bids.$.status': false,
                'bids.$.active': false
            }
        },
        callback
    );
}
*/