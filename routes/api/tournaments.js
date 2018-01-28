var express = require('express');
var TournamentsService = require('../../services/TournamentsService')
var router = express.Router();

/* GET tournament listing. */
router.get('/', function (req, res, next) {
    return TournamentsService.find().then(
        data => {
            "use strict";
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* GET tournament by ID. */
router.get('/:id', function (req, res, next) {
    return TournamentsService.findOne(req.params.id).then(
        data => {
            "use strict";
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* POST tournament . */
router.post('/', function (req, res, next) {
    return TournamentsService.create(req.body).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* UPDATE tournament by ID . */
router.post('/:id', function (req, res, next) {
    return TournamentsService.updateOne(req.params.id,req.body).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

/* UPDATE tournament by ID . */
router.post('/:id/registration', function (req, res, next) {
    return TournamentsService.registration(req.params.id,req.body).then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        res.status(500);
        next(e);
    })
});

module.exports = router;
