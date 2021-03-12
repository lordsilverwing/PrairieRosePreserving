const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
//Require your User Model here!

// configuring Passport!
//this gets called at the initial login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    User.findOne({'googleId': profile.id}, function(err, user){
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        })
      }
    })
  }
));

// This puts the user's id in the session cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  User.findById(id, function(err, student) {
    done(err, student);
  });
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



