/**
 * Created by DewmiR on 11/2/2016.
 */

'use strict';

var mongoose = require('mongoose');

var deletdMeetingSchema = new mongoose.Schema({
    header: String,
    body: String,
    date: String,
    time : String,
    from : String,
    to : String,
    venue : String
});

var DeletedMeeting = module.exports = mongoose.model('deletedMeetings',deletdMeetingSchema);

module.exports.createDelMeeting = function(newDeletedMeeting, callback){
    newDeletedMeeting.save(callback);
};



