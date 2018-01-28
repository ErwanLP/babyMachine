var express = require('express');
var UsersService = require('./../../services/UsersService')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    return UsersService.find().then(
        data => {
            "use strict";
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* POST users . */
router.post('/', function (req, res, next) {
    return UsersService.create(req.body).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* GET user by ID. */
router.get('/:id', function (req, res, next) {
    return UsersService.findOne(req.params.id).then(
        data => {
            "use strict";
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* UPDATE user by ID . */
router.post('/:id', function (req, res, next) {
    return UsersService.updateOne(req.params.id,req.body).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* Delete user by ID . */
router.delete('/:id', function (req, res, next) {
    return UsersService.remove(req.params.id).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

module.exports = router;
