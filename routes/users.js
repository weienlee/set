const express = require('express');
const router = express.Router();
const utils = require('../util/utils.js');
const User = require('../models/user.js');

// POST /users
// creates new user account
router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    utils.checkUserDetails(res, username, password, function() {
        User.create(username, password, function(result) {
            if (result.code === 200) {
                req.session.username = username;
                utils.sendSuccessResponse(res);
            } else {
                utils.sendErrResponse(res, result.code, result.err);
            }
        });
    });
});

module.exports = router;
