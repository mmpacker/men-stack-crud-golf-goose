const Course = require('../models/course');

module.exports = {
    index,
}

function index(req, res) {
    Course.find({})
    .then((courses) => {
        console.log('INDEX - View All Courses')
        res.render('courses/index', {
            title: 'All Golf Courses',
            courses,
            user: req.user,
            users
        })
    })
}