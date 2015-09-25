
'use strict';

/**
* Module dependencies.
*/
var passport = require('passport');

module.exports = function(app) {
// User Routes
var users = require('../controllers/users');

// User Routes
app.get('/signin', users.signin);
app.get('/signup', users.signup);
app.get('/signout', users.signout);
app.get('/api/users/me', users.me);

// Setting up the users api
app.post('/api/register', users.create);

app.route('/api/logout')
  .get(users.signout);

app.route('/api/login')
       .post(passport.authenticate('local', {
           failureFlash: true
       }), users.login);

app.route('/api/loggedin')
      .get(function(req, res) {
          res.send(req.isAuthenticated() ? req.user : '0');
      });


// Setting the facebook oauth routes
app.get('/api/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signin'
}), users.signin);

app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
}), users.authCallback);

// Setting the twitter oauth routes
app.get('/api/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
}), users.signin);

app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
}), users.authCallback);

// Setting the google oauth routes
app.get('/api/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}), users.signin);

app.get('/api/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
}), users.authCallback);

// Finish with setting up the userId param
app.param('userId', users.user);
};
