const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var blogs = [];

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
  blogs.push(req.body);

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