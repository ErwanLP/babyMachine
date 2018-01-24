const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        trigram  :  String,
        firstName: String,
        lastName : String

    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('User', schema);

