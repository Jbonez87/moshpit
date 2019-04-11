const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');

const config = require('./webpack.config.js');
const schema = require('./api/schema.js');

const app = express();

const compiler = webpack(config);
const midWare = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false,
  },
});

const options = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  dbUrl: process.env.DBURL,
};

// connect to mongoDB
mongoose.connect(
  `mongodb://${options.user}:${options.password}${options.dbUrl}`, {
    useNewUrlParser: true,
  },
);

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('connected'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
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
