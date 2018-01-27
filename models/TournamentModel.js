const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        name  :  String,
        startDate: Date,
        endDate : String,

    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('Tournaments', schema);

