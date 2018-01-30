var passport = require('passport');
var CustomStrategy = require('passport-custom').Strategy;

var User = require('../../models/UserModel');
var UserService = require('../../services/UsersService');
var RoleService = require('../../services/RolesService');
var bcrypt = require('bcrypt');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserService.findOne(id).then(
        function (doc) {
            done(null, doc)
        },
        function (err) {
            done(err)
        }
    );
});

passport.use('credential-authentication', new CustomStrategy(
    function (req, done) {
        if (!req.body.email) {
            done(null, false, {message: 'login missing'});
        } else if (!req.body.password) {
            done(null, false, {message: 'password missing'});
        } else {
            UserService.findOneByEmail(req.body.email).then(
                function (user) {
                    if (!user) {
                        return done(null, false, {message: 'user not found'});
                    }
                    // If we have a user lets compare the provided password with the
                    // user's passwordHash
                    return bcrypt.compare(req.body.password, user.password).then(function (res) {
                        // res == true
                        if (res) {
                            return done(null, user, null);
                        } else {
                            return done(null, false, {message: 'Invalid Password'});
                        }
                    });
                },
                function (err) {
                    console.log(err);
                    return done(err, false, {message: 'An Error occured'});
                }
            );
        }
    }
));

module.exports.local = function (req, res, next) {
    passport.authenticate('credential-authentication', function (err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            return next();
        });
    })(req, res, next);
};


module.exports.isAuthenticated = function (redirect) {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            if (redirect) {
                return res.redirect(redirect);
            } else {
                return res.status(401).send();

            }
        }
    }
};


module.exports.hasRight = function (right) {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            RoleService.hasRoleRight(req.user.role, right)
                .then(
                    () => {
                        return next();

                    })
                .catch(e => {
                    return res.status(403).send();
                })
        } else {
            // otherwise redirect to login
            return res.status(401).send();
        }
    }
};

module.exports.isAdmin = function () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === 'ADMIN') {
                return next();

            } else {
                return res.status(403).send();

            }
        } else {
            // otherwise redirect to login
            return res.status(401).send();
        }
    }
};

module.exports.isMySelf = function (key) {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.id === req.params[key]) {
                return next();
            } else {
                return res.status(403).send();
            }
        } else {
            // otherwise redirect to login
            return res.status(401).send();
        }
    }
};

module.exports.isAdminBoolean = function (req) {
    return (req.isAuthenticated() && req.user.role === 'ADMIN')
}


