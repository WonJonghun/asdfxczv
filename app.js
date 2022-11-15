var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session'); 
var cors = require('cors');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash')

var mainPageRouter = require('./routes/main');
var testPageRouter = require('./routes/test');
var dashboardPageRouter = require('./routes/dashboard');
var dashboardMobilePageRouter = require('./routes/dashboardMobile');
var buildingSettingPageRouter = require('./routes/buildingSetting');
var panelSettingPageRouter = require('./routes/panelSetting');
var panelSetting2PageRouter = require('./routes/panelSetting2');
var staticCamSettingPageRouter = require('./routes/staticCamSetting');
var staticReportPageRouter = require('./routes/staticReport');
var mobileReportPageRouter = require('./routes/mobileReport');
var manageStaticPageRouter = require('./routes/manageStatic');
var manageMobilePageRouter = require('./routes/manageMobile');
var loadingPageRouter = require('./routes/loading');
var app = express();

// var corsOption = {
//   origin: 'http://192.168.0.6:5000',
//   credential: true
// }

// app.use(cors(corsOption));
// CORS 설정
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret:"my key",
  resave: true,
  saveUninitialized: true
}));

// app.use(cookieSession({
//   keys:['node_yun'],
//   cookie: {
//     maxAge: 1000 * 60 * 60
//   }
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session())

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/upload_file',express.static(path.join(__dirname, '/upload')));
// app.use('/streaming_file',express.static(path.join('/home/pi/Desktop/TVSLS/Backend/src/AI/storage/')));

app.use('/', mainPageRouter);
app.use('/loading', loadingPageRouter);
app.use('/test', testPageRouter);
app.use('/dashboard', dashboardPageRouter);
app.use('/dashboardMobile', dashboardMobilePageRouter);
app.use('/buildingSetting', buildingSettingPageRouter);
app.use('/panelSetting', panelSettingPageRouter);
app.use('/panelSetting2', panelSetting2PageRouter);
app.use('/staticCamSetting', staticCamSettingPageRouter);
app.use('/staticReport', staticReportPageRouter);
app.use('/mobileReport', mobileReportPageRouter);
app.use('/manageStatic', manageStaticPageRouter);
app.use('/manageMobile', manageMobilePageRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use((req,res,next)=>{   //404 에러처리 미들웨어
//   const err = new Error('NOT FOUND');
//   err.status = 404;
//   next(err);
// });

// app.use((err,req,res)=>{     //500 에러처리 미들웨어
//   res.status(err.status||500);
//   res.render('error');
// });

// app.listen(5902,()=>{      //포트설정
//   console.log('5433번 포트에서 서버 대기중입니다!');
// });

module.exports = app;