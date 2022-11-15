var maria = require('mysql');

var maria_pool = maria.createConnection({
    host: 'localhost',
    // host:'211.230.189.173',
    port: 3306,
    user: 'goback',
    password: 'goback@2022',
    database: 'gobacktest',
    multipleStatements: true,
    timezone: 'Asia/Seoul'
});

module.exports={
    'maria' : maria_pool,
    //'influx' : influxdb
};