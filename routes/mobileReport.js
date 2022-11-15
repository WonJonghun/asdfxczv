var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('mobileReport', {});
});

router.post('/get_date', db_controller.get_date);
router.post('/get_mobileData', db_controller.get_mobileData);

module.exports = router;
