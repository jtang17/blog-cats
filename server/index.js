const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:1337'
//   },
//   (accessToken, refreshToken, profile, done) => {
//     //do something
//   }
// ));

// app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login'] }))
// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
//   (req,res) => {
//     res.redirect('/');
//   });

//console.log(__dirname + '/../src/public/');
app.use(express.static(__dirname + '/../src/public/'));

app.get('/', (req, res) => {
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

let PORT = 1337;

app.listen(PORT, () => console.log(`Listeing on port ${1337}`));