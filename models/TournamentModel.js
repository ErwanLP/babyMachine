const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        name  :  String,
        startDate: Date,
        endDate : String,
        teams: [{
            team : {type:mongoose.Schema.ObjectId, ref: 'Team'},
        }],
    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('Tournaments', schema);

