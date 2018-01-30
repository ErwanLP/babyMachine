var User = require('../models/UserModel');
var CommonService = require('./CommonService');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const ADMIN = 'ADMIN';
const USER = 'USER';

requireModule = require('@std/esm')(module)
var {isUserValid} = requireModule('./../sharedModules/services/UsersService');
var {rejectedPromise} = requireModule('./../sharedModules/services/UtilsService');

function hydrate(bean, data) {
    bean.trigram = data.trigram;
    bean.email = data.email;
    bean.firstName = data.firstName;
    bean.lastName = data.lastName;
    bean.password = data.password;
    bean.role = bean.role === ADMIN ? (data.role === ADMIN ? ADMIN : USER) : USER;
    return bean;
}

function hydrateAsAdmin(bean, data) {
    bean.trigram = data.trigram;
    bean.email = data.email;
    bean.firstName = data.firstName;
    bean.lastName = data.lastName;
    bean.password = data.password;
    bean.role = data.role;
    return bean;
}

module.exports.create = function (object) {
    if (isUserValid(object)) {
        return bcrypt.hash(object.password, saltRounds).then(hash => {
            "use strict";
            object.password = hash;
            return CommonService.create(User, object, hydrate);
        })
    } else {
        return rejectedPromise(400 ,'User is not valid')
    }
};

module.exports.createAsAdmin = function (object) {
    if (isUserValid(object)) {
        return bcrypt.hash(object.password, saltRounds).then(hash => {
            "use strict";
            object.password = hash;
            return CommonService.create(User, object, hydrateAsAdmin);
        })
    } else {
        return rejectedPromise(400 ,'User is not valid')
    }
};

module.exports.findOne = function (id) {
    return CommonService.findOne(User, {_id: id});
};

module.exports.findOneByEmail = function (email) {
    return CommonService.findOne(User, {email: email});
};

module.exports.find = function () {
    return CommonService.find(User, {});
};

module.exports.updateOne = function (id, object) {
    if (isUserValid(object)) {
        return CommonService.updateOne(User, id, object, hydrate);

    } else {
        return rejectedPromise(400 ,'User is not valid')
    }
};

module.exports.updateOneAsAdmin = function (id, object) {
    if (isUserValid(object)) {
        return CommonService.updateOne(User, id, object, hydrateAsAdmin);

    } else {
        return rejectedPromise(400 ,'User is not valid')
    }
};

module.exports.remove = function (id, object) {
    return CommonService.remove(User, id, object, hydrate);
};

module.exports.changePassword = function (id, object) {
    return bcrypt.hash(object.password, saltRounds).then(hash => {
        "use strict";
        object.password = hash;
        return CommonService.updateOne(User, id, object, function (bean, data) {
            bean.password = data.password
            return bean;
        });
    })
};
