const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        trigram  :  String,
        email: String,
        firstName : String,
        lastName : String,
        password : String,
        role : String

    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('User', schema);

