var Tournament = require('../models/TournamentModel');
var CommonService = require('./CommonService');


function hydrate(bean, data) {
        bean.name = data.name;
        bean.startDate = data.startDate;
        bean.players = data.players;
        return bean;
}

module.exports.create = function (object) {
    return CommonService.create(Tournament, object, hydrate);
};

module.exports.findOne = function (id) {
    return CommonService.findOneWithPopulate(Tournament, {_id: id},  'players.player');
};

module.exports.find = function () {
    return CommonService.findWithPopulate(Tournament, {}, 'players.player');
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(Tournament, id, object, hydrate);
};
