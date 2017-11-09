var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback({code: 500, err: err});
      } else if (!user) {
        return callback({code: 401, err: 'User not found.'});
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback({code: 200, data: user});
        } else {
          return callback({code: 403, err: 'Incorrect username/password.'});
        }
      })
    });
};

// create new user
UserSchema.statics.create = function(username, password, callback) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      callback({code: 500, err: err});
    } else if (user) {
      callback({code: 403, err: 'The username "' + username + '" is already taken.'});
    } else {
      const data = new User({
        username: username,
        password: password
      });
      data.save(function(err, user) {
        if (err) {
          callback({code: 500, err: err});
        } else {
          callback({code: 200, data: user});
        }
      });
    }
  });
};

// get user by username
UserSchema.statics.getUser = function(username, callback) {
  User.findOne({username: username}).exec(function(err, user){
    if (err) {
      callback({code: 500, err: err});
    } else {
      callback({code: 200, data: user});
    }
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;