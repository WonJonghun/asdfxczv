var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('dashboard', {});
});

router.post('/get_cameraImage', db_controller.get_cameraImage);
router.post('/get_equipList', db_controller.get_equipList);
router.post('/get_tempAndCoord', db_controller.get_tempAndCoord);
router.post('/get_tempAndCoord_dashboard', db_controller.get_tempAndCoord_dashboard);
router.post('/get_tempAndCoordByMonth', db_controller.get_tempAndCoordByMonth);
router.post('/get_tempData', db_controller.get_tempData);
router.post('/get_tempData_dashboard', db_controller.get_tempData_dashboard);
router.post('/get_tempCount', db_controller.get_tempCount);

module.exports = router;
