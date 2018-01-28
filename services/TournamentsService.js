var Tournament = require('../models/TournamentModel');
var CommonService = require('./CommonService');


function hydrate(bean, data) {
    bean.name = data.name;
    bean.startDate = data.startDate;
    return bean;
}

module.exports.create = function (object) {
    return CommonService.create(Tournament, object, hydrate);
};

module.exports.findOne = function (id) {
    return new Promise(function (resolve, reject) {
        Tournament.findOne({_id: id})
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
    return CommonService.find(Tournament, {});
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(Tournament, id, object, hydrate);
};
module.exports.registration = function (id, data) {
    return new Promise(function (resolve, reject) {
        Tournament.findOne({_id: id}, function (err, doc) {
            if (doc) {
                if (!doc.teams) {
                    doc.teams = [];
                }
                doc.teams.push({
                    team: data.selectedTeam
                });
                doc.save(function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(doc);
                    }
                })
            } else {
                reject({message: 'document not found'})
            }
        });
    });
}
