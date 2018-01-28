const mongoose = require('mongoose');
let UserModel = require('./UserModel');


let schema = new mongoose.Schema(
    {
        name  :  String,
        numberPlayer  :  Number,
        players: [{
                player : {type:mongoose.Schema.ObjectId, ref: 'User'},
                isManager : Boolean,
        }],

    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('Team', schema);

