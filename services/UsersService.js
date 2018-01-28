var User = require('../models/UserModel');
var CommonService = require('./CommonService');

function hydrate(bean, data) {
        bean.trigram = data.trigram;
        bean.email = data.email;
        bean.firstName = data.firstName;
        bean.lastName = data.lastName;
        bean.password = data.password;
    return bean;
}

module.exports.create = function (object) {
    return CommonService.create(User, object, hydrate);
};

module.exports.findOne = function (id) {
    return CommonService.findOne(User, {_id: id});
};

module.exports.find = function () {
    return CommonService.find(User, {});
};

module.exports.updateOne = function (id, object) {
    return CommonService.updateOne(User, id, object, hydrate);
};

module.exports.remove = function (id, object) {
    return CommonService.remove(User, id, object, hydrate);
};
