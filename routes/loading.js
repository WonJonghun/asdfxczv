var express = require('express');
var router = express.Router();
var db_controller = require('../routes/controller/db_data');

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('loading', {});
});

module.exports = router;
