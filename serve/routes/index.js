/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const dicRouter = require('./dict');
const websiteRouter = require('./website');
const Router = express.Router();

Router.use('/website', websiteRouter);
Router.use('/dic', dicRouter);

module.exports = Router;
