var User = require('../models/UserModel');
var CommonService = require('./CommonService');

module.exports.create = function (object) {
    return CommonService.getList(User, object, hydrate);
};

module.exports.getList = function () {
    return CommonService.getList(User, {});
};
