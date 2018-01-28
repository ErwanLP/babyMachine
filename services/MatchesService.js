let Match = require('../models/MatchModel');
let CommonService = require('./CommonService');


function hydrate(bean, data) {
    bean.teams = data.teams;
    bean.tournament = data.tournament;
    bean.numberOfTeam = data.numberOfTeam;
    return bean;
}

module.exports.create = function (object) {
    return CommonService.create(Match, object, hydrate);
};

module.exports.findOne = function (id) {
    return new Promise(function (resolve, reject) {
        Match.findOne({_id: id})
            .populate({
                path : 'teams.team',
                populate : ({
                    path: 'players.player'
                })

            })
            .exec(function (err, list) {
                if (err) {
                    reject(err);
                } else {
                    resolve(list)
                }
            });
    });
};

module.exports.find = function () {
    return new Promise(function (resolve, reject) {
        Match.find({})
            .populate('teams.team')
            .populate('tournament', 'name')
            .exec(function (err, list) {
                if (err) {
                    reject(err);
                } else {
                    resolve(list)
                }
            });
    });
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(Match, id, object, hydrate);
};
