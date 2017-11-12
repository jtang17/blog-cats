
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
//const config = require('../config.js');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../src/public/'));

// if token, public/ otherwise res.redirect to google/auth

app.get('/api/blogs', (req, res) => {
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

app.post('/api/delete', (req, res) => {
  console.log(req.body);
  db.Post.remove({ _id: req.body._id }, (err) => {
    if (err) {
      throw err;
    } else {
      res.send('Message Deleted');
    }
  })
});

app.post('/api/update', (req, res) => {
  console.log(req.body);
  db.Post.findOne({ _id: req.body._id}, (err, doc) => {
    if (err) {
      throw err;
    } else {
      doc.content = req.body.content;
      doc.save();
      res.send('Message Updated');
    }
  })
});

let PORT =  process.env.PORT || 1337;  //deployment PORT (TODO)

app.listen(PORT, () => console.log(`Listening on port ${1337}`));