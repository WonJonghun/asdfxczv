var express = require('express');
var router = express.Router();
var db_controller = require('../routes/controller/db_data');

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('buildingSetting', {});
});

router.post('/check_buildingName', db_controller.check_buildingName);
router.post('/insert_building', db_controller.insert_building);
router.post('/update_building', db_controller.update_building);
router.post('/delete_building', db_controller.delete_building);
router.post('/update_center', db_controller.update_center);

module.exports = router;
