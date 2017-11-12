const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.secret,
    callbackURL: 'http://localhost:1337'
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      db.User.findOne({ id: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User({ id: profile.id, token: token.id, name: displayName });
          newUser.save((err) => {
            if (err) {
              throw err;
            } else {
              console.log(newUser);
              return done(null, newUser);
            }
          })
        }
      })
    })
  }
));

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login'] }))
app.get('/auth/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/auth/google'}))