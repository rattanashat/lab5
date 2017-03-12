var express = require('express');
var router = express.Router();
var Account = require('../models/account');

function SignedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
/* GET users listing. */
router.get('/', SignedIn, function(req, res, next) {

    Account.find(function(err, accounts) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }

        res.render('users', {
            accounts: accounts,
            title: 'Users',
            user: req.user
        });
    });
});


module.exports = router;
