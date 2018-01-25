module.exports.find = function (MongooseModel, conditionObject) {
    return new Promise(function (resolve, reject) {
        MongooseModel.find(conditionObject).exec(function (err, list) {
            if (err) {
                reject(err);
            } else {
                resolve(list)
            }
        });
    });
};

module.exports.findOne = function (MongooseModel, query) {
    return new Promise(function (resolve, reject) {
        MongooseModel.findOne(query).exec(function (err, object) {
            if (err) {
                reject(err);
            } else {
                resolve(object)
            }
        });
    });
};
module.exports.create = function (MongooseModel, object, hydrateFn) {
    return new Promise(function (resolve, reject) {
        var newDoc = new MongooseModel();
        newDoc = hydrateFn(newDoc, object);
        try{
            newDoc.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoc);
                }
            });
        } catch (e){
            reject(e);
        }

    })
};

module.exports.updateOne = function (MongooseModel, id, object, hydrateFn) {
    return new Promise(function (resolve, reject) {
        MongooseModel.findOne({_id: id}, function (err, doc) {
            if (doc) {
                doc = hydrateFn(doc, object);
                doc.save(function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(doc);
                    }
                })
            } else{
                reject({message : 'User not found'})
            }
        });
    });
};

module.exports.remove = function (MongooseModel, id) {
    return new Promise(function (resolve, reject) {
        MongooseModel.remove({_id: id}, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
};

module.exports.removeAll = function (MongooseModel) {
    return new Promise(function (resolve, reject) {
        MongooseModel.remove({}, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
};





