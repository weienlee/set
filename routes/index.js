var express = require('express');
var router = express.Router();
var utils = require('../util/utils.js');
var User = require('../models/user.js');

// GET home page
router.get('/', function(req, res) {
    console.log(req.session);
    if (req.session.username) {
        User.getUser(req.session.username, function(response) {
            res.render('pages/index', {
                title: 'SET',
                auth: true,
                username: req.session.username,
                user: response.data
            });
        });
    } else {
        res.render('pages/index', {
            title: 'SET',
            auth: false
        });
    }
});

// POST /login
router.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    utils.checkUserDetails(res, username, password, function() {
        User.authenticate(username, password, function(result) {
            if (result.code === 200) {
                req.session.username = username;
                utils.sendSuccessResponse(res);
            } else {
                utils.sendErrResponse(res, result.code, result.err);
            }
        });
    });
});

// POST /logout
router.post('/logout', utils.requireLogin, function(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            utils.sendErrResponse(res, 500, err);
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

module.exports = router;
