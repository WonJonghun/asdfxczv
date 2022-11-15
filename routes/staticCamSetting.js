var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('staticCamSetting', {});
});

router.post('/get_camera', db_controller.get_camera);
router.post('/get_buildingAndPanelAndEquip', db_controller.get_buildingAndPanelAndEquip);
router.post('/update_coord', db_controller.update_coord);
router.post('/insert_coord', db_controller.insert_coord);
router.post('/delete_coord', db_controller.delete_coord);

module.exports = router;
