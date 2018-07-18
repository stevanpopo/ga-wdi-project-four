const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { port, dbURI } = require('./config/environment');

app.use(express.static(`${__dirname}/public`));
mongoose.connect(dbURI);

app.use(bodyParser.json());
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use(errorHandler);

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
