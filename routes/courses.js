const router = require('express').Router()
const coursesCtrl = require('../controllers/courses')

router.get('/', isLoggedIn, coursesCtrl.index)
router.get('/mylist', isLoggedIn, coursesCtrl.myList)
router.get('/new', isLoggedIn, coursesCtrl.new)
router.get('/search', isLoggedIn, coursesCtrl.search)
router.get('/:id', isLoggedIn, coursesCtrl.show)
router.get('/:id/review', isLoggedIn, coursesCtrl.review)
router.get('/:id/edit', isLoggedIn, coursesCtrl.editCourse)

router.post('/', isLoggedIn, coursesCtrl.create)
router.post('/find', isLoggedIn, coursesCtrl.find)
router.post('/:id/createReview', isLoggedIn, coursesCtrl.createReview)
router.post('/:id/myPlayed', isLoggedIn, coursesCtrl.addToMyList)

router.delete('/:id', isLoggedIn, coursesCtrl.delete)
router.delete("/:id/myPlayed", isLoggedIn, coursesCtrl.removeFromMyList)

router.put('/:id', isLoggedIn, coursesCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }
  
  module.exports = router;