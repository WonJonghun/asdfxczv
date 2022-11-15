
var express = require('express');
const {exec} = require('child_process');
var router = express.Router();




/* GET page. */
router.get('/', function (req, res, next) {

    res.render('test', {});
});


router.post('/test_ssh', function (req, res, next) {
    exec('python C:\\Users\\Goback\\Desktop\\AI\\수배전반(0926)\\public\\rpi-data-sync.py', (err,results) => {
        if(err) {
            console.error(err);
            return
        }
        console.log(results);
    })
    res.send();
})

module.exports = router;