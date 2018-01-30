var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

/* GIT PAYLOAD */
router.post('/git-payload', function(req, res, next) {
  const exec = require('child_process').exec;
  exec('sh deployment.sh ./../');
  res.send('payload ok')
});

module.exports = router;
