const mongoose = require('mongoose');
var UserModel = require('./UserModel');


var schema = new mongoose.Schema(
    {
        name  :  String,
        players: [{
                player : {type:mongoose.Schema.ObjectId, ref: 'UserModel'},
        }],

    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('Team', schema);

