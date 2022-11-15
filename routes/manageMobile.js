var express = require('express');
var db_controller = require('../routes/controller/db_data');
var router = express.Router();


/* GET page. */
router.get('/', function (req, res, next) {

    res.render('manageMobile', {});
});


module.exports = router;
