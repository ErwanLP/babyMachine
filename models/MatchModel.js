const mongoose = require('mongoose');
let TeamModel = require('./TeamModel');
let TournamentModel = require('./TournamentModel');

let schema = new mongoose.Schema(
    {
        teams: [{
                team : {type:mongoose.Schema.ObjectId, ref: 'Team'},
                score : Number,
                winner : Boolean,
        }],
        tournament : {type:mongoose.Schema.ObjectId, ref: 'Tournament'},
        numberOfTeam : Number
    }
);
schema.set('versionKey', false);
module.exports = mongoose.model('Match', schema);

