const { response } = require('express');
const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
    index,
    myList,
    new: newCourse,
    search,
    find: findCourse,
    create,
    show
}

function show(req, res) {
    Course.findById(req.params.id)
    .populate('playedBy')
    .then((course => {
        res.render('courses/show', {
            title: 'Course Details',
            user: req.user,
            course: response.data,
            playedBy: course ? course.playedBy : [''],
            reviews: course ? course._id : ''
        })
    }))
}

function create(req, res) {
    Course.create(req.body, function(err, course) {
        res.redirect('/courses')
    })
}

function findCourse(req, res) {
    Course.find({ name: req.body.name })
        .then(courses => {
            res.render('courses/search', {
                title: 'Search Courses',
                user: req.user,
                courses
            })
        })
}

function search(req, res) {
    res.render('courses/search', {
        title: 'Search Courses',
        user: req.user
    })
}

function newCourse(req, res) {
    res.render('courses/new', {
        user: req.user,
        title: 'Add a New Course'
    })
}

function myList(req, res) {
    Course.find({ playedBy: req.user._id })
    .then((courses) => {
      res.render('courses/mylist', {
        title: "My Golf Courses",
        user: req.user,
        courses
      })
    })
  }

function index(req, res) {
    Course.find({})
    .then((courses) => {
        console.log('INDEX - View All Courses')
        res.render('courses/index', {
            title: 'All Golf Courses',
            courses,
            user: req.user,
        })
    })
}