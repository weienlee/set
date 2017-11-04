var express = require('express');
var router = express.Router();
var utils = require('../util/utils.js');
var User = require('../models/user.js');

// GET home page
router.get('/', function(req, res) {
    if (req.session.username) {
        User.getUser(req.session.username, function(response) {
            res.render('index', {
                title: 'SET',
                auth: true,
                username: req.session.username,
                user: response.data
            });
        });
    } else {
        res.render('index', {
            title: 'index',
            auth: false
        });
    }
});

// POST /login
router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    utils.checkUserDetails(res, username, password, function() {
        User.findByName(username, function(result) {
            if (result.code === 200) {
                var user = result.data;
                if (password == user.password) {
                    req.session.username = username;
                    utils.sendSuccessResponse(res);
                } else {
                    utils.sendErrResponse(res, 403, 'Incorrect password');
                }
            } else {
                utils.sendErrResponse(res, result.code, result.err);
            }
        });
    });
});

module.exports = router;
