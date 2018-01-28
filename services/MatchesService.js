let Match = require('../models/MatchModel');
let CommonService = require('./CommonService');


function hydrate(bean, data) {
    bean.teams = data.teams;
    bean.tournamentId = data.tournamentId;
    bean.numberOfTeam = data.numberOfTeam;
    return bean;
}

module.exports.create = function (object) {
    return CommonService.create(Match, object, hydrate);
};

module.exports.findOne = function (id) {
    return CommonService.findOneWithPopulate(Match, {_id: id}, 'teams.team');

};

module.exports.find = function () {
    return CommonService.find(Match, {});
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(Match, id, object, hydrate);
};
