var express = require('express');
var UsersService = require('./../services/UsersService')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return UsersService.getList().then(
      _=> {
        "use strict";

      }
  )
});

/* POST users . */
router.get('/', function(req, res, next) {
  return UsersService.create()
});

module.exports = router;
