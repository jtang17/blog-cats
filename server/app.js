const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

let PORT = 1337;

app.listen(PORT, () => console.log(`Listeing on port ${1337}`));