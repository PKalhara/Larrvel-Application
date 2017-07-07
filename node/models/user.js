'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
    name : String,
    itnum : String,
    userType : String,
    post : String,
    phone:String,
    email: String,
    gpa:String,
    lecturerPosition: String,
    image: String,
    staffNumber: String
});

var User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    if(candidatePassword == hash){
    	callback(null,true);
    }else{
    	callback("not mathing",false);
    }
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.userType="student";
            newUser.save(callback);
        });
    });
}

module.exports.getAllLecturers = function(callback){
    var userType = 'lecturer';
    User.find({userType:userType},callback);
};

module.exports.getUserByUserName = function(callback){

};


module.exports.createLecturer = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getAllLecturersNames = function(callback){
    var userType = 'lecturer';
    User.find({userType:userType},{ name: 1, _id: 0 },callback);
};

module.exports.getEmailOfUserByName = function(name, callback){
    var query = {name: name};
    User.findOne(query, callback);
}


module.exports.getUsers = function(id, callback){
    User.findById(id, callback);
}

