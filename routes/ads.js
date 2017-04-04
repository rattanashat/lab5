
// express setup
let express = require('express');
let router = express.Router();

// link to the ad model for CRUD operations
let Ad = require('../models/ad');

// auth check
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); // user is logged, so call the next function
   }

   res.redirect('/'); // not logged in so redirect to home
}

/* GET ads main page */
router.get('/', function(req, res, next) {

   // use mongoose model to query mongodb for all ads
   Ad.find(function(err, ads) {
      if (err) {
         console.log(err);
         res.end(err);
         return;
      }

      // no error so send the ads to the index view
      res.render('ads/index', {
         ads: ads,
         title: 'Ad List',
          user: req.user
      });
   });
});

// GET /ads/add - show blank add form
router.get('/add', isLoggedIn,  function(req, res, next) {
   // show the add form
   res.render('ads/add', {
      title: 'Ad Details',
       user: req.user
   });
});

// POST /ads/add - save the new ad
router.post('/add', isLoggedIn, function(req, res, next) {
   // use Mongoose to populate a new Ad
   Ad.create({
      title: req.body.title,
      car: req.body.car,
      price: req.body.price,
      year: req.body.year
   }, function(err, ad) {
          if (err) {
             console.log(err);
             res.render('error');
             return;
          }
         res.redirect('/ads');
   });
});

// GET /ads/delete/_id - delete and refresh the index view
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
   // get the id parameter from the end of the url
   let _id = req.params._id;

   // use Mongoose to delete
   Ad.remove({ _id: _id }, function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/ads');
   });
});

// GET /ads/_id - show edit page and pass it the selected Ad
router.get('/:_id', isLoggedIn, function(req, res, next) {
   // grab id from the url
   let _id = req.params._id;

   // use mongoose to find the selected Ad
   Ad.findById(_id, function(err, Ad) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.render('ads/edit', {
         Ad : Ad,
         title: 'Ad Details',
          user: req.user
      });
   });
});

// POST /ads/_id - save the updated ad
router.post('/:_id', isLoggedIn, function(req, res, next) {
   // grab id from url
   let _id = req.params._id;

   // populate new ad from the form
   let ad = new Ad({
      _id: _id,
      title: req.body.title,
      car: req.body.car,
      price: req.body.price,
      year: req.body.year
   });

   Ad.update({ _id: _id }, ad,  function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('/ads');
   });
});

// make this file public
module.exports = router;
