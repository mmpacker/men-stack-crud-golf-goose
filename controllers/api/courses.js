// const Course = require('../../models/course');
// const User = require('../../models/user');

// module.exports = {
//     index,
//     show,
//     create,
//     update,
//     delete: deleteCourse
// }

// function index(req, res){
//     Course.find({})
//     .then((courses) => {
//         res.status(200).json(courses)
//     })
//         .then((courses) => {
//             res.render('courses/index', {
//                 title: 'All Golf Courses',
//                 courses,
//                 user: req.user,
//             })
//     })
    
// }

// function show(req, res){
//     Course.findById(req.params.id)
//     .then((course) => {
//         res.status(200).json(course)
//     })
// }

// function create(req, res){
//     Course.create(req.body)
//     .then((course) => {
//         res.status(201).json(course)
//     })
// }

// function update(req, res){
//     Course.findByIdAndUpdate(req.params.id, req.body)
//     .then((course) => {
//         res.status(200).json(course)
//     })
// }

// function deleteCourse(req, res){
//     Course.findByIdAndDelete(req.params.id)
//     .then((course) => {
//         res.status(200).json(course)
//     })
// }