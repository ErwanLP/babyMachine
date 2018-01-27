var Team = require('../models/TeamModel');
var CommonService = require('./CommonService');


function hydrate(bean, data) {
        bean.name = data.name;
        bean.startDate = data.startDate;
        bean.endDate = data.endDate;
        return bean;
}

module.exports.create = function (object) {
    return CommonService.create(Team, object, hydrate);
};

module.exports.findOne = function (id) {
    return CommonService.findOneWithPopulate(Team, {_id: id},  'players.player');
};

module.exports.find = function () {
    return CommonService.findWithPopulate(Team, {}, 'players.player');
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(Team, id, object, hydrate);
};
