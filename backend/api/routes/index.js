const MongoClient = require('mongodb').MongoClient;
var multer  = require('multer');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');

var ctrlAuth = require('../controllers/authentication');
var ctrlAdjustments = require('../controllers/adjustments')


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


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//adjustments
router.post('/uploadTTFiles', auth,
            upload.fields([
                  { name: 'teacherCsvData', maxCount: 1 },
                  { name: 'classCsvData', maxCount: 1 }
            ]),ctrlAdjustments.uploadTTFiles
);

router.get('/getAllTeachers', auth, ctrlAdjustments.getAllTeachers);

router.post('/fetchAdjustments', auth,ctrlAdjustments.fetchAdjustments);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);
module.exports = router;
