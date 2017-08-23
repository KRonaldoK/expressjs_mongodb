'use strict';
var express = require('express');
var router = express.Router();

var ctrlCourses = require('../controllers/courses.controllers.js');

router
  .route('/courses')
  .get(ctrlCourses.coursesGetAll);

router
  .route('/courses/:courseId')
  .get(ctrlCourses.coursesGetOne);

router
  .route('/courses/new')
  .post(ctrlCourses.coursesAddOne);

module.exports = router;