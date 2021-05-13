require('newrelic');
const express = require('express');
const app = express();
const router = require('./routes.js');
const port = 3000;
app.use(express.json());

app.get('/', router);

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`)
})