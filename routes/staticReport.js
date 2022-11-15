var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('staticReport', {});
});

router.post('/get_year', db_controller.get_year);
router.post('/get_month', db_controller.get_month);
router.post('/get_chart_data_val_by_month', db_controller.get_chart_data_val_by_month);
router.post('/get_panels_and_img_by_month', db_controller.get_panels_and_img_by_month);
router.post('/get_equipList_and_coord_by_month', db_controller.get_equipList_and_coord_by_month);
// router.post('/get_check_panels_by_month', db_controller.get_check_panels_by_month);

module.exports = router;
