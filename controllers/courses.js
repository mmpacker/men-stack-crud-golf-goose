const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
    index,
    myList,
    new: newCourse,
    search,
    find: findCourse,
    create,
    show,
    review,
    removeFromMyList,
    addToMyList,
    createReview,
    update,
    editCourse
}

function editCourse(req, res) {
    Course.findById(req.params.id)
    .then(course => {
        res.render('courses/edit', {
            title: 'Edit Course Details',
            // user: req.user,
            course,
        })
    })
}

function update(req, res) {
    req.body.public = !!req.body.public
    Course.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/courses/${req.params.id}`)
    })
}

function createReview(req, res) {
    Course.findById(req.params.id)
    .then((course) => {
        course.reviews.push(req.body)
        course.save()
        .then(() => {
            res.redirect(`/courses/${req.params.id}`)
        })
    })
}

function addToMyList(req, res) {
    req.body.playedBy = req.user._id
    Course.findById(req.params.id)
    .then((course) => {
        if (course) {
            course.playedBy.push(req.user._id)
            course.save()
            .then(() => {
                res.redirect(`/courses/${req.params.id}`)
            })
            .catch(err => console.log(err))
        } else {
            Course.create(req.body)
            .then(() => {
                res.redirect(`/courses/${req.params.id}`)
            })
        }
    })
}

function removeFromMyList(req, res) {
    Course.findById(req.params.id)
    .then((course) => {
        let idx = course.playedBy.indexOf(req.user._id)
        course.playedBy.splice(idx, 1)
        course.save()
        .then(() => {
            res.redirect(`/courses/${req.params.id}`)
        })
    })
}

function review(req, res) {
    Course.findById(req.params.id)
    .populate('playedBy')
    .then((course => {
        res.render('courses/review', {
            title: 'Course Reviews',
            // user: req.user,
            course,
            playedBy: course ? course.playedBy : [''],
            reviews: course ? course._id : '',
            courseId: course ? course._id : ''
        })
        console.log('This is the course object: ', course)
        console.log('This is the reviews object: ', course.reviews)
    }))
}

function show(req, res) {
    Course.findById(req.params.id)
    .populate('playedBy')
    .then(course => {
        res.render('courses/show', {
            title: 'Course Details',
            // user: req.user,
            course,
            playedBy: course ? course.playedBy : [''],
            // reviews: course ? course._id : '',
            // courseId: course ? course._id : ''
        })
    })
    .catch(err => console.log(err))
}

function create(req, res) {
    req.body.public = !!req.body.public
    Course.create(req.body, function(err, course) {
        res.redirect('/courses')
    })
}

function findCourse(req, res) {
    Course.find({ name: req.body.query })
    .then((results) => {
        res.render('courses/search', {
            title: 'Search Courses',
            // user: req.user,
            results
        })
    })
}

function search(req, res) {
    res.render('courses/search', {
        title: 'Search Courses',
        // user: req.user,
        results: null
    })
}

function newCourse(req, res) {
    res.render('courses/new', {
        // user: req.user,
        title: 'Add a New Course'
    })
}

function myList(req, res) {
    Course.find({ playedBy: req.user._id })
    .then((courses) => {
        res.render('courses/mylist', {
            title: "My Golf Courses",
            // user: req.user,
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
            // user: req.user,
        })
    })
}