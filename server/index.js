const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname + '/../src/public/');
app.use(express.static(__dirname + '/../src/public/'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/api/blogs', (req, res) => {
  res.send(JSON.stringify([{blog: 1}]));
});

app.post('/api/blogs', (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

let PORT = 1337;

app.listen(PORT, () => console.log(`Listeing on port ${1337}`));