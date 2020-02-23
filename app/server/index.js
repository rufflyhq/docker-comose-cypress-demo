const path = require('path');
const { resolve } = require('path');
const express = require('express');

const port = parseInt(process.env.PORT || '8080', 10);
const app = express();

const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(publicPath, express.static(outputPath));
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};

addProdMiddlewares(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(err);

  console.log('App is listening on port ' + port);
});
