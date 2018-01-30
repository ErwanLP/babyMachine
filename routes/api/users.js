var express = require('express');
var UsersService = require('./../../services/UsersService')
var authentication = require('./../../modules/authentication');


var router = express.Router();

/* GET users listing. */
router.get('/',
    authentication.hasRight('GET_USERS'),
    function (req, res, next) {
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
    let p;
    if (authentication.isAdminBoolean(req)) {
        p = UsersService.createAsAdmin(req.body)
    } else if (authentication.isAuthenticated()) {
        res.status(403);
        p = Promise.reject('403')
    } else{
        p = UsersService.create(req.body);
    }
    return p.then(
        function (data) {
            res.send(data)
        }
    ).catch(function (e) {
        next(e);
    })
});

/* LOG user  */
router.post('/login',
    authentication.local,
    function (req, res, next) {
        res.status(200).send(req.user);
    }
);

/* GET currentUser by ID. */
router.get('/currentUser',
    authentication.isAuthenticated(),
    function (req, res, next) {
        res.send(req.user)
    }
);

/* GET user by ID. */
router.get('/:id',
    authentication.hasRight('GET_USER'),
    function (req, res, next) {
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

/* GET user by ID. */
router.post('/:id/changePassword',
    authentication.isMySelf('id'),
    function (req, res, next) {
        return UsersService.changePassword(req.params.id, req.body).then(
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
router.post('/:id',
    authentication.isAuthenticated(),
    function (req, res, next) {
        let p;
        if (authentication.isAdminBoolean(req)) {
            p = UsersService.updateOne(req.params.id, req.body)
        } else {
            p = UsersService.updateOne(req.params.id, req.body)
        }
        return p.then(
            function (data) {
                res.send(data)
            }
        ).catch(function (e) {
            res.status(500);
            next(e);
        })
    });

/* Delete user by ID . */
router.delete('/:id',
    authentication.isAdmin(),
    function (req, res, next) {
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
