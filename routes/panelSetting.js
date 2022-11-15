var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  res.render('panelSetting', {});
});

router.post('/get_equipments', db_controller.get_equipments);
router.post('/panels_equip_db_call', db_controller.panels_equip_db_call);
router.post('/insert_panel', db_controller.insert_panel);
router.post('/get_panel_id', db_controller.get_panel_id);
router.post('/update_panel_name', db_controller.update_panel_name);
router.post('/insert_new_equip', db_controller.insert_new_equip);
router.post('/delete_equipment', db_controller.delete_equipment);
router.post('/delete_panel', db_controller.delete_panel);

module.exports = router;
