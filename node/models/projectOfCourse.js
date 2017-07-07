'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectOfCourseSchema = new mongoose.Schema({

	course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
	project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    bids: [{
        status: Boolean,
        active: Boolean,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    updated: { type: Date, default: Date.now }

});

var ProjectOfCourse = module.exports = mongoose.model('ProjectOfCourse',ProjectOfCourseSchema);


module.exports.createProjectOfCourse = function(newProjectOfCourse, callback){
    newProjectOfCourse.save(callback)
}

module.exports.getAllProjectOfCourse = function(callback){
	ProjectOfCourse.find({}).populate('bids.by').populate('course').populate('project').exec(callback)
}

module.exports.getProjectsByCourseID = function(user,cid,callback){
    ProjectOfCourse.find({'course':cid, 'bids.by': { $ne: user } }).populate('bids.by').populate('course').populate('project').exec(callback)
    //entrants.find({ pincode: { $ne: null } })
}

module.exports.addNewBids = function(poc,bidUser,callback){

    ProjectOfCourse.findByIdAndUpdate(
        poc,
        { 
            $push: {
                "bids": {
                    "status": false,
                    "active": true,
                    "by": bidUser            
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

module.exports.approveBit = function(bid,poc,callback){
    ProjectOfCourse.update(
        {
            'bids._id':bid._id
        },
        { 
            $set: {   
                'bids.$.status': true,
                'bids.$.active': true
            }
        },
        callback
    );
}

module.exports.recoverBit = function(bid,poc,callback){
    ProjectOfCourse.update(
        {
            'bids._id':bid._id
        },
        { 
            $set: {   
                'bids.$.status': false,
                'bids.$.active': true
            }
        },
        callback
    );
}

module.exports.removeBit = function(bid,poc,callback){
    ProjectOfCourse.update({},{
        $pull:{
            "bids":{
                "_id":bid._id
            }
        }
    },
    {
        multi:true
    },
    callback
    )
}

module.exports.getAllMyProjects = function(user,callback){
    ProjectOfCourse.find({'bids.by':user,'bids.status':true}).populate('bids.by').populate('course').populate('project').exec(callback)
}

module.exports.getAllMyPendingProjects = function(user,callback){
    ProjectOfCourse.find({'bids.by':user,'bids.status':false,'bids.active':true}).populate('bids.by').populate('course').populate('project').exec(callback)
}

module.exports.getAllMyRejectedProjects = function(user,callback){
    ProjectOfCourse.find({'bids.by':user,'bids.status':false,'bids.active':false}).populate('bids.by').populate('course').populate('project').exec(callback)
}

