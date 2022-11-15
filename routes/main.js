var express = require('express');
var router = express.Router();
var db_controller = require('../routes/controller/db_data');

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('main', {});
});

router.post('/get_buildingList', db_controller.get_buildingList);
router.post('/get_center', db_controller.get_center);
router.post('/get_panels', db_controller.get_panels);
router.post('/get_equipmentsInPanel', db_controller.get_equipmentsInPanel);
router.post('/get_chart_data', db_controller.get_chart_data);
router.post('/get_chart_data_val', db_controller.get_chart_data_val);

module.exports = router;
