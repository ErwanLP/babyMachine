var mongoose = require('mongoose');
var config = require('config');

var timeout = 3000000;

module.exports.openConnection = function () {
    return new Promise(
        function (resolve, reject) {
            mongoose.Promise = global.Promise;
            mongoose.connect(config.get('mongo.url'), {
                uri_decode_auth: true,
                server: {socketOptions: {keepAlive: timeout, connectTimeoutMS: timeout}},
                replset: {socketOptions: {keepAlive: timeout, connectTimeoutMS: timeout}}
            }, function (err, db) {
                if(err){
                    console.error('Connection database : KO');
                    console.log(err);
                    reject(err);
                } else{
                    console.log('Connection database : OK');
                    resolve(db);
                }
            });
        }
    )
};

module.exports.closeConnection = function () {
    mongoose.connection.close()
};
