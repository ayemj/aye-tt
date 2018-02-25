var mongoose = require('mongoose');
var User = mongoose.model('User');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
var db;
MongoClient.connect('mongodb://127.0.0.1:27017/', (err, client) => {
    db = client.db('NodeDatabase');
    if (err) return console.log(err)
});

function readTeacherData(contentTeacher) {
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
  // fs.writeFile('datanew.txt', JSON.stringify(teacherArray), function (err) {
  //       if (err) {
  //         // append failed
  //         console.log(err);
  //       } else {
  //         // done
  //         console.log("Done");
  //       }
  //     });
}



module.exports.uploadTTFiles = function(req, res) {
  console.log("Upload Files Initiated");
  if (!req.payload._id) {
    console.log("Upload Files Unauthorized");
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        console.log("Upload Files Uploaded" + user.email);
        console.log(req.files);
        filejson ={};
        filejson["userName"] = user.email;
        filejson["timeStamp"] = (new Date()).toString();
        files =[];
        fileDetail = {};
        fileDetail["path"] = req.files["teacherCsvData"][0]["path"];
        fileDetail["typeOfFile"] = "teacherCsvData";
        var contentTeacher = fs.readFileSync(fileDetail["path"], 'utf8').split("\n");
        readTeacherData(contentTeacher);
        files.push(fileDetail);
        fileDetail = {};
        fileDetail["path"] = req.files["classCsvData"][0]["path"];
        fileDetail["typeOfFile"] = "classCsvData";
        files.push(fileDetail);
        filejson["files"] = files;
        db.collection('UploadFiles').insert(filejson);
        console.log(filejson);
        myObj = { "status":"done" };
        res.header("Access-Control-Allow-Origin", "*");

        res.status(200).json(myObj);
      });
  }
};

function getAllTeachersList(callback) {
  db.collection("TTUpdatedNew").find({},{_id:1,"teacherName":1}).toArray(function (err, result) {
    if (err) throw err;
    teacherList = [];
    for (m = 0; m < result.length; m++) {
      teacherList.push(result[m]);
    }
    callback(teacherList);
  });
}
module.exports.getAllTeachers = function(req, res) {
  console.log("getAllTeachers Initiated");
  if (!req.payload._id) {
    console.log("getAllTeachers Unauthorized");
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        console.log("getAllTeachers Uploaded" + user.email);
        getAllTeachersList(function(teacherList){
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json(teacherList);
        });
      });
  }
};







module.exports.profileRead0 = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        user["vlc"] = "Mukul";
        console.log(user);
        myObj = { "name":"John DOE", "age":30, "car":null };
        res.status(200).json(myObj);
      });
  }

};
