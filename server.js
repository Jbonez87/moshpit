process.env.ENV = process.env.ENV || 'dev';

require('dotenv').config()
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const wpMiddleWare = require('webpack-dev-middleware');
const wpHotMiddleWare = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const fetch = require('node-fetch');
const app = express();
const key = process.env.API_KEY;

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const midWare = wpMiddleWare(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(midWare);
  app.use(wpHotMiddleWare(compiler));
}

app.use(express.static(path.join(__dirname, 'src')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'static', 'index.html'));
});

 app.get('/shows/:zip', async (req, res) => {
  console.log(req.params.zip);
  try {
    let request = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&postalCode=${req.params.zip}`)
    let shows = await request.json()
    return res.status(200).send(shows)

  } catch (err) {
    console.log('this didn\'t work');
    console.error(err);
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
