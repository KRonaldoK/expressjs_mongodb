'use strict';
var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;

module.exports.coursesGetAll = function(req, res) {

  var db = dbconn.get();

  // console.log("db", db);

  console.log('GET the courses');
  console.log(req.query);

  var offset = 0;
  var count = 5;

  var collection = db.collection('course');

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found courses", docs.length);
      res
        .status(200)
        .json(docs);
  });

};

module.exports.coursesGetOne = function(req, res) {
  var db = dbconn.get();
  var id = req.params.courseId;
  var collection = db.collection('course');
  console.log('GET courseId', id);

  collection
    .findOne({
      _id : ObjectId(id)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
  });

};

module.exports.coursesAddOne = function(req, res) {
  console.log("POST new course");
  var db = dbconn.get();
  var collection = db.collection('course');
  var newCourse;

  if (req.body && req.body.name && req.body.stars) {
    newCourse = req.body;
    newCourse.stars = parseInt(req.body.stars, 10);
    collection.insertOne(newCourse, function(err, response) {
      console.log("Course added", response);
      console.log("Course added", response.ops);
      res
        .status(201)
        .json(response.ops);
    });
    // console.log(newCourse);
    // res
    //   .status(200)
    //   .json(newCourse);
  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({ message : "Required data missing from body" });
  }

};