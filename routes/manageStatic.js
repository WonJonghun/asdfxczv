var express = require('express');
var db_controller = require('../routes/controller/db_data');
const IP = require('ip');
const SSH = require('simple-ssh');
const OS_ENV = require('os');
var router = express.Router();

var userName = OS_ENV.userInfo().username
var ipAddress = IP.address();

/* GET page. */
router.get('/', function (req, res, next) {

    res.render('manageStatic', {});
});

var ssh = new SSH({
    host: "192.168.0.17",
    user: "lepton",
    pass: "lepton@2022"
});

// ssh.exec('ls -l', {out: function(stdout){console.log(stdout)}}).start();

router.post('/send_data', function (req, res, next) {
    console.log("send//////")
    ssh.exec('ssh-copy-id -i ~/.ssh/id_rsa.pub ' + userName + '@' + ipAddress, {out: function(stdout){console.log(stdout)}}).start();

    console.log('-aP /home/lepton/projects/aivoucher/data/ ' + userName + '@' + ipAddress + ':C:/Users/Goback/Desktop/test')
    ssh.exec('rsync', {
        args: ['-aP /home/lepton/projects/aivoucher/data/ ' + userName + '@' + ipAddress + ':C:\\Users\\Goback\\Desktop\\test'],
        out: function (stdout) {
            console.log(stdout);
        }
    }).start()
})

router.post('/get_camera_by_id', db_controller.get_camera_by_id);
router.post('/get_cam_all_info', db_controller.get_cam_all_info);
router.post('/get_all_panels', db_controller.get_all_panels);

module.exports = router;
