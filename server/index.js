const config = require('../config.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

//lisa's rec for deployment (TODO)

//let config;
//if(dev env) { config=require('../config.js')}
//deployment environment - heroku config commands

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'thisismybestkeptsecret123',
  resave: true,
  saveUninitialized: true
}));


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

//console.log(__dirname + '/../src/public/');
app.use(express.static(__dirname + '/../src/public/'));

// if token, res.sendFile, otherwise res.redirect to google/auth
app.get('/', (req, res) => {
  // db.User.find({}).exec((err, docs) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log(docs);
  //   }
  // });
  if (!token) {
    res.redirect('/auth/google');
  }
  res.sendFile('index.html');
});

app.get('/api/blogs', (req, res) => {
  // res.send(JSON.stringify([{title: '1st blog', user: 'hack', content: 'what up'}, {title: '2nd blog', user: 'reactor', content: 'suckas'}]));
  db.Post.find({}).sort({updatedAt: -1}).exec((err, docs) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(docs));
    }
  });
});

app.post('/api/blogs', (req, res) => {
  console.log(req.body);
  var newPost = new db.Post(req.body);
  newPost.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('saved');
    }
  })
  res.send(JSON.stringify(req.body));
});

app.get('/api/user/*', (req, res) => {
  let user = req.url.substring(10);
  db.Post.find({username: user}).sort({updatedAt: -1}).exec((err, docs) => {
    if (err) {
      throw err;
    } else {
      console.log(docs);
      res.send(JSON.stringify(docs));
    }
  });
});

let PORT =  1337;  //deployment PORT (TODO)

app.listen(PORT, () => console.log(`Listening on port ${1337}`));