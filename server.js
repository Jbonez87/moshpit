const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();

const compiler = webpack(config);
const midWare = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false,
  },
});

app.use('/graphql', graphqlHTTP({
  
}));

app.use(midWare);
app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'src')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'static', 'index.html'), (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
