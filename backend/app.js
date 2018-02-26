/*

  There are some minor modifications to the default Express setup
  Each is commented and marked with [SH] to make them easy to find

 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// [SH] Require Passport
var passport = require('passport');
const fs = require('fs');
// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');


// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

var app = express();

var multer  = require('multer');
var path = require('path');


// app.get('/', (req, res) => {
//     console.log('welcome to node js');
//     res.sendFile('/home/shaunik/rohitjindal/NodeJsProject' + '/index.html');
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// catch 404 and forward to error handler

const MongoClient = require('mongodb').MongoClient;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '-' + file.originalname);
    }
});

var upload = multer({storage: storage});
var db;
MongoClient.connect('mongodb://127.0.0.1:27017/', (err, client) => {
    db = client.db('NodeDatabase');
    if (err) return console.log(err)
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/upload/data', upload.fields([
    { name: 'teacherCsvData', maxCount: 1 },
    { name: 'classCsvData', maxCount: 1 }
  ]),(req, res) => {
    if (!req.payload._id) {
      res.status(401).json({
        "message" : "Unauthorized"
      });
    } else{
      User.findById(req.payload._id).exec(function(err, user) {
        console.log('Mukul upload');
        console.log(req.files);
        res.json({"message" : ": Uploaded Succesfully" });
      });
    }

});
teacherArray = [];
var teacherList = [];
//var content = fs.readFileSync('timeTable.csv', 'utf8').split("\n");
var contentTeacher = fs.readFileSync('timeTableNew.csv', 'utf8').split("\n");
function getAllTeachersList(callback) {
  db.collection("TTUpdatedNew").find({}).toArray(function (err, result) {
    if (err) throw err;
    for (m = 0; m < result.length; m++) {
      teacherList.push(result[m].teacherName);
    }
    callback(teacherList);
  });
  return teacherList;
}
// Read csv data
function readTeacherData() {
  var timeJson = {};
  var timeSlotArr =[];
  for (i = 0; i < contentTeacher.length; i = i + 10) {
    var teacherJson = {};
    var teachername = contentTeacher[i].split(",")[0].trim().split("-")[1];
    teacherJson["teacherName"] = teachername;
    var timeArray = contentTeacher[i+1].split(",").slice(1);
    console.log(timeArray);
    timetable = [];
    for (k = i + 3; k < i + 9; k++) {
      dayWise = [];
      var lectureArr = contentTeacher[k].split(",").slice(1);
      for (l =0 ;l <timeArray.length;l++) {
        lecture = {};
        if (timeArray[l].trim() != '') {
          var timeJson = {};
          lecture["class"] = lectureArr[l].trim();
          if (lecture["class"] == ''){
            lecture["class"] = 'Free';
          }
          var timearr = timeArray[l].trim().split("-");
          timeJson["startTime"] = timearr[0];
          timeJson["endTime"] = timearr[1];
          lecture["timeSlot"] = timeJson;
          dayWise.push(lecture);
        }
      }
      timetable.push(dayWise);
    }
    teacherJson["timetable"] = timetable;
    //console.log(teacherJson);
    teacherArray.push(teacherJson);
  }

  db.collection('TTUpdatedNew').insert(teacherArray);
  fs.writeFile('datanew.txt', JSON.stringify(teacherArray), function (err) {
        if (err) {
          // append failed
          console.log(err);
        } else {
          // done
          console.log("Done");
        }
      });
}


app.get('/', (req, res) => {
  console.log(req.payload);
  if (!req.payload._id) {
    console.log("Error in ////////////////////////////////////////////");
    res.status(401).json({
      "message" : "Unauthorized"
    });
  } else{
      User.findById(req.payload._id).exec(function(err, user) {
        console.log('welcome to node js');
        readTeacherData();
        getAllTeachersList(function(teacherList){
          console.log("Teacher List" + teacherList);
        })
      });
    }


  //readDataFromClassCSV();
  //readDataFromTeacherCSV();
  //readData();
});


// error handlers

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    console.log("Mukul app.js");
    res.json({"message" : err.name + ": \n" + err});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("Mukul Error caught");
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
